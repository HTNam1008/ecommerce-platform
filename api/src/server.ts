import dotenv from "dotenv";
dotenv.config();

import { connectDb } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 5000;
connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});