const mongoose = require("mongoose");

const Invoice = new mongoose.Schema(
    {
        invoice_no: {
            type: Number,
            unique: true,
        },
        full_name: {
            type: String,
        },
        phone_no: {
            type: Number,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        pincode: {
            type: Number,
        },
        items: [
            {
                item_name: {
                    type: String,
                },
                item_quantity: {
                    type: Number,
                },
                item_cost: {
                    type: Number,
                },
            },
        ],
        tax: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        sub_total: {
            type: Number,
        },
        grand_total: {
            type: Number,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("invoices", Invoice);
