const express = require("express");
const router = express.Router();

const {
    addOrder,
    getOrders,
    getOrder,
    updateOrders
} = require("../controllers/orderController");

const { isVerifiedUser } = require("../middleware/tokenVerification");

router.route("/")
    .post(isVerifiedUser, addOrder)
    .get(isVerifiedUser, getOrders);

router.route("/:id")
    .get(isVerifiedUser, getOrder)
    .put(isVerifiedUser, updateOrders);

module.exports = router;
