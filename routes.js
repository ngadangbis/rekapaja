const Expense = require("./controllers/expense.controller.js");
const Type = require("./controllers/type.controller.js");

const routes = (module.exports = app => {
  app.post("/type/create", Type.createType);
  app.post("/type/getType/:type", Type.getType);
  app.post("/type/getFromRedis", Type.getFromRedis);
  app.post("/expense/createExpense", Expense.createExpense);

  app.get("/home", function(req, res) {
    res.redirect("/");
  });

  app.get("/type/getDebit/", Type.getTypeDebit);
  app.get("/type/getCredit/", Type.getTypeCredit);
  app.post("/type/deleteById/:id", Type.deleteById);
  app.get("/type/insertDebit/", function(req, res) {
    res.render("insertDebit");
  });
  app.get("/type/insertCredit/", function(req, res) {
    res.render("insertCredit");
  });

  app.post("/type/insertDataDebit/", Expense.createExpenseDebit);
  app.post("/type/insertDataCredit/", Expense.createExpenseCredit);
  app.post("/type/getOne/:id", Type.getOne);
  app.post("/type/updateOne/:id", Type.updateOne);
  app.get("/", Type.home);
});

module.exports = routes;
