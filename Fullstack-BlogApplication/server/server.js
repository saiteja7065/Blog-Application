const exp = require("express");
const app = exp();
require("dotenv").config();
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const cors=require('cors')

app.use(cors())

// Body parser MUST be before route handlers
app.use(exp.json());

const port = process.env.PORT;
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

app.use((err, req, res, next) => {
  console.log("error object in express handler", err);
  res.status(500).send({ message: "error occured", ermessage: err.message });
});
