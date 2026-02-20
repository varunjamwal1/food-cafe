const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        guests: { type: Number, default: 1 }
    },

    orderStatus: {
        type: String,
        enum: ["pending", "preparing", "served", "completed", "cancelled"],
        default: "pending"
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        totalWithTax: { type: Number }
    },

    items: [
        {
            itemName: String,
            quantity: Number,
            price: Number
        }
    ],
    table:{type: mongoose.Schema.Types.ObjectId,ref:"Table"
    }
},
{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
