import express from "express";
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node.js server is running on port ${port}`));