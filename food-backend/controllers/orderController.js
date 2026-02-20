const Order = require("../models/orderModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

/* ================= CREATE ORDER ================= */
const addOrder = async (req, res, next) => {
  try {
    const { customerDetails, bills, items } = req.body;

    if (!customerDetails || !bills || !items) {
      return next(createHttpError(400, "Missing required order fields"));
    }

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (err) {
    next(err);
  }
};

/* ================= GET ALL ORDERS ================= */
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table");

    if (!orders.length) {
      return next(createHttpError(404, "No orders found"));
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (err) {
    next(err);
  }
};

/* ================= GET SINGLE ORDER ================= */
const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Order ID"));
    }

    const order = await Order.findById(id).populate("table");

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (err) {
    next(err);
  }
};

/* ================= UPDATE ORDER ================= */
const updateOrders = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Order ID"));
    }

    const order = await Order.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return next(createHttpError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOrder,
  updateOrders
};
