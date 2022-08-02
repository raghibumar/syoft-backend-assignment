const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://rag:1234a@clusterraghib.hnb77.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongoose is running");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log("server is running");
});
