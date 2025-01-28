const express = require("express");
const cors = require("cors");
const Connection = require("./database/db");
const Route = require("./routes/route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Route);
Connection();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 0MM344WSPw4cloFR
