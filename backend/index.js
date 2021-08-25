const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.Port || 5000;

//import routes
const invoiceRoute = require("./routes/invoices");

//middleware
app.use(cors());
app.use(express.json());

//route middlewares
app.use("/api/invoice", invoiceRoute);

//connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
});
