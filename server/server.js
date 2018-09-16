require("./config/config");
const express = require("express");

const { mongoose } = require("./db/mongoose");

const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");

const app = express();

app.use(express.json());

app.use("/categories", categoryRoute);
app.use("/products", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}.`);
});
