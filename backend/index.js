const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/main");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/", mainRouter);

app.listen(3000);


