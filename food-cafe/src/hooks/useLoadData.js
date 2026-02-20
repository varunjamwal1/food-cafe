import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../https/index";
import { setUser, removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 🔹 loader state

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false); // no token → stop loader
          return;
        }

        const { data } = await getUserData();

        dispatch(setUser(data.data));
      } catch (error) {
        console.log("SESSION EXPIRED:", error);

        localStorage.removeItem("token");
        dispatch(removeUser());

        navigate("/auth", { replace: true });
      } finally {
        setLoading(false); // hide loader
      }
    };

    loadUser();
  }, [dispatch, navigate]);

  return loading; // 🔹 return loading state
};

export default useLoadData;
