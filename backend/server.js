const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors()); 
app.use(express.json());

const matchRoutes = require("./routes/match.js");

app.use("/api/match", matchRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});