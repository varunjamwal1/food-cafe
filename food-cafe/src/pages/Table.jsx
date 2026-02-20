import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTable } from "../redux/slices/customerSlice"; // import your reducer
import { useNavigate } from "react-router-dom";
import BottomNav from "../componets/BottomNav";
import BackButton from "../componets/Home/BackButtoon";
import TableCard from "../componets/Table/TableCard";
import { getTables } from "../https/index";

const Table = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tables, setTables] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch tables from backend
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await getTables();
        if (Array.isArray(response.data)) setTables(response.data);
        else if (response.data.tables) setTables(response.data.tables);
        else setTables([]);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  // Handle table selection
  const handleTableSelect = (table) => {
    if (table.status !== "reserved") {
      // Update table in Redux state
      dispatch(updateTable({ tableNo: table.tableNo }));
      // Navigate to menu
      navigate("/menu");
    } else {
      alert("This table is reserved!");
    }
  };

  // Filter tables
  const filteredTables =
    filter === "all"
      ? tables
      : tables.filter((t) => t.status === "reserved");

  return (
    <div className="h-[650px] flex flex-col bg-[var(--color-background)]">
      {/* HEADER */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Tables
            </h1>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full overflow-hidden">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-sm font-medium transition duration-300 ${
                filter === "all"
                  ? "bg-[var(--color-primary)] text-white shadow"
                  : "text-[var(--color-text-muted)] hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("reserved")}
              className={`px-5 py-2 text-sm font-medium transition duration-300 ${
                filter === "reserved"
                  ? "bg-[var(--color-primary)] text-white shadow"
                  : "text-[var(--color-text-muted)] hover:bg-gray-200"
              }`}
            >
              Reserved
            </button>
          </div>
        </div>
      </div>

      {/* TABLE GRID */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">
        {loading ? (
          <p className="text-center text-gray-500 mt-10 animate-pulse">
            Loading tables...
          </p>
        ) : filteredTables.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No tables found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {filteredTables.map((table) => (
              <TableCard
                key={table._id}
                table={{
                  number: table.tableNo,
                  status: table.status,
                  seats: table.seats || 4,
                }}
                onClick={() => handleTableSelect(table)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Table;