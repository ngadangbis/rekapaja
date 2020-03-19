const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));

const MONGODBURL =
  "mongodb+srv://felixxaris@gmail.com:testaja1@cluster0-rp0jg.mongodb.net/test?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT;

const url = process.env.MONGODBURL || "mongodb://localhost:27017/rekapaja";
// const url =
//   "mongodb+srv://felixxaris@gmail.com:testaja1@cluster0-rp0jg.mongodb.net/test?retryWrites=true&w=majority";

async function connect() {
  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Success connect DB");
  } catch (err) {
    console.log("ERR ", err);
  }
}

connect();

const routes = require("./routes.js");

routes(app);

app.use((req, res, next) => {
  res.render("notfound");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
