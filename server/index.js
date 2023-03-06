const express = require("express");
const app = express();
const Port = process.env.PORT || 3333;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
require("dotenv").config();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Home First page");
});
app.use("/auth", require("./routes/authRoute"));
app.use("/property", require("./routes/propertyRoute"));
app.use(verifyJWT);
app.use("/user", require("./routes/userRoute"));
app.use("/lead", require("./routes/leadRoute"));

app.listen(Port, () => {
  console.log(`server is running on ${Port}`);
});
