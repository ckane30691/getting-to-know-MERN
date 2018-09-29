const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./private/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require("./passport")(passport);

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => res.send("Hello World"));
  app.use("/api/users", users);

  app.listen(port, () => console.log(`Server is running on port ${port}`));
