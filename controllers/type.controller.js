const Expense = require("../models/expense.models.js");
const Type = require("../models/type.models.js");
const redis = require("redis");

const createType = async (req, res) => {
  const types = new Type();
  types.type = req.body.type;
  types
    .save()
    .then(result => {
      res.json({ message: "Type created!", result });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const getType = async (req, res) => {
  Type.findOne({ type: req.params.type })
    .populate("expenses")
    .then(result => {
      Expense.find()
        .where("_id")
        .in(result.content)
        .exec((err, records) => {
          res.json(records);
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const getTypeDebit = async (req, res) => {
  await Type.findOne({ type: "Debit" })
    .populate("expenses")
    .then(result => {
      Expense.find()
        .where("_id")
        .in(result.content)
        .exec(async (err, records) => {
          temp = JSON.stringify(records);
          res.render("alldata", {
            title: "getTypeDebit",
            records: records
          });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const getOne = async (req, res) => {
  try {
    const one = await Expense.findOne({ _id: req.params.id });
    res.render("modify", {
      records: one
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const home = async (req, res) => {
  const debit = await Expense.aggregate([
    { $match: { type: "Debit" } },
    { $group: { _id: null, amount: { $sum: "$total" } } }
  ]);
  tempDeb = debit.toString();
  console.log(tempDeb);

  const credit = await Expense.aggregate([
    { $match: { type: "Credit" } },
    { $group: { _id: null, amount: { $sum: "$total" } } }
  ]);
  tempCre = JSON.parse(JSON.stringify(credit));
  console.log(tempCre.amount);
  console.log(credit[0].amount);

  res.render("index", { debit: debit[0].amount, credit: credit[0].amount });
};

const getAllDebit = async (req, res) => {
  try {
    const one = await Expense.aggregate([
      { $match: { type: "Debit" } },
      { $group: { _id: null, amount: { $sum: "$total" } } }
    ]);

    console.log(one);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const getAllCredit = async (req, res) => {
  try {
    const one = await Expense.aggregate([
      { $match: { type: "Credit" } },
      { $group: { _id: null, amount: { $sum: "$total" } } }
    ]);
    console.log(one);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params; //update dari id url
    const { dates, total, description } = req.body; //update dari id url

    const result = await Expense.updateOne(
      { _id: id },
      { $set: { date: dates, total: total, description: description } }
    );
    res.render("success");
    console.log("masuk");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const getTypeCredit = async (req, res) => {
  await Type.findOne({ type: "Credit" })
    .populate("expenses")
    .then(result => {
      Expense.find()
        .where("_id")
        .in(result.content)
        .exec(async (err, records) => {
          temp = JSON.stringify(records);
          res.render("alldata", {
            title: "getTypeCredit",
            records: records
          });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const deleteById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    await Expense.deleteOne({ _id: id });
    res.render("success");
    console.log("masuk");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const getFromRedis = async (req, res) => {
  try {
    const client = redis.createClient();
    //check data from redis
    client.get("type", async (err, result) => {
      if (err) throw err;
      //jika ada maka tampilkan dari redis
      if (result) {
        const type = JSON.parse(result);
        res.json({ type: type, from: "REDIS" });
      } else {
        const type = await Type.find({});
        const temp = await JSON.stringify(type);
        //set ke redis
        client.set("type", JSON.stringify(temp));
        res.json({ type: type, from: "MONGODB" });
        console.log("save to edis done");
      }
    });
  } catch (err) {
    res.status(500).json({
      err: err
    });
  }
};

module.exports = {
  createType,
  getType,
  getTypeDebit,
  deleteById,
  getFromRedis,
  getTypeCredit,
  getOne,
  updateOne,
  home
};
