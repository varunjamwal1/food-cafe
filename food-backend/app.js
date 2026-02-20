require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const cors = require("cors")
const app = express();




app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/tables", require("./routes/tableRoute"));


app.use(globalErrorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("Database connection failed");
        process.exit(1);
    }
};

startServer();
