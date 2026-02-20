const Table = require("../models/tableModel");
const Order = require("../models/orderModel");
const createHttpError = require("http-errors");

/* ================= ADD TABLE ================= */
const addTable = async (req, res, next) => {
  try {
    let { tableNo, seats } = req.body;

    tableNo = Number(tableNo);
    seats = Number(seats);

    if (!tableNo || tableNo < 1)
      return next(createHttpError(400, "Invalid table number"));

    if (!seats || seats < 1)
      return next(createHttpError(400, "Invalid seats count"));

    const exists = await Table.findOne({ tableNo });
    if (exists)
      return next(createHttpError(409, "Table already exists"));

    const table = await Table.create({ tableNo, seats });

    res.status(201).json({
      success: true,
      message: "Table created successfully",
      table
    });

  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL TABLES ================= */
const getTable = async (req, res, next) => {
  try {
    const tables = await Table.find()
      .sort({ tableNo: 1 })
      .populate({
        path: "currentOrder",
        select: "orderStatus customerDetails bill"
      });

    res.status(200).json({
      success: true,
      count: tables.length,
      tables
    });

  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE TABLE STATUS ================= */
const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;

    const table = await Table.findById(req.params.id);
    if (!table) return next(createHttpError(404, "Table not found"));

    /* OCCUPY TABLE */
    if (status === "occupied") {
      if (!orderId)
        return next(createHttpError(400, "orderId required to occupy table"));

      const order = await Order.findById(orderId);
      if (!order) return next(createHttpError(404, "Order not found"));

      table.status = "occupied";
      table.currentOrder = orderId;

      order.table = table._id;
      await order.save();
    }

    /* FREE TABLE */
    else if (status === "available") {
      if (table.currentOrder) {
        await Order.findByIdAndUpdate(table.currentOrder, { table: null });
      }

      table.status = "available";
      table.currentOrder = null;
    }

    /* RESERVE TABLE */
    else if (status === "reserved") {
      table.status = "reserved";
    }

    await table.save();

    res.status(200).json({
      success: true,
      message: "Table status updated",
      table
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTable, updateTable };