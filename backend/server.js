const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tripdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const groupPreferenceRoutes = require("./routes/groupPreferenceRoutes");
const userGroupContributionRoutes = require("./routes/userGroupContributionRoutes");

// Use routes
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/group-preferences", groupPreferenceRoutes);
app.use("/user-contributions", userGroupContributionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
