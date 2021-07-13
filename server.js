const express = require("express");
const connectDB = require("./config/connection");

const app = express();
app.use(express.json({ extended: false }));

// Call connectDB
connectDB();

app.get("/", (req, res) => res.send());

/* Routes */
app.use("/APIs/users", require("./routes/APIs/users"));
app.use("/APIs/profile", require("./routes/APIs/profile"));
app.use("/APIs/posts", require("./routes/APIs/posts"));
app.use("/APIs/auth", require("./routes/APIs/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started");
});
