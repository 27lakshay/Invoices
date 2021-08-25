const router = require("express").Router();
const Invoice = require("../models/invoice");

router.get("/", async (req, res) => {
    try {
        console.log("hit");
        const invoices = await Invoice.find({});
        res.json({
            status: 1,
            invoices,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/invoicecount", async (req, res) => {
    try {
        const invoice = await Invoice.find({}).sort({ _id: -1 }).limit(1);
        res.json({
            status: 1,
            last_invoice: invoice[0],
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ invoice_no: req.params.id });
        res.json({
            status: 1,
            invoice,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/add", async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.json({
            status: 1,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
