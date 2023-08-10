// mysql
const mysql = require("mysql2");
const connection = mysql.createConnection({
  user: "root",
  password: "123456",
  database: "money",
});

// express
const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

// util
const { api, updateOnDemand } = require("./util");

// 查询用户列表
app.get("/queryUsers", (req, res) => {
  connection.query("SELECT * FROM user", (err, results) => {
    if (err) console.log(err);
    res.send(api(results));
  });
});

// 创建用户 {mail: '', password: ''}
app.post("/createUser", (req, res) => {
  connection.query(
    `
  INSERT INTO user ( mail, password ) VALUES ("${req.body.mail}", "${req.body.password}")
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});

// 删除用户
app.delete("/deleteUser/:id", (req, res) => {
  connection.query(
    `
  DELETE FROM user WHERE id=${req.params.id};
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});

// 更新用户 {password: ''}
app.put("/updateUser/:id", (req, res) => {
  connection.query(
    `
  UPDATE user SET password='${req.body.password}' WHERE id=${req.params.id};
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});

// 查询账单 {user_id: 6}
app.get("/queryBill", (req, res) => {
  connection.query(
    `SELECT * FROM bill WHERE user_id=${req.body.user_id}`,
    (err, results) => {
      if (err) console.log(err);
      res.send(api(results));
    }
  );
});

// 创建账单 {user_id: 6, type: 1, money: -200, time: "2023-08-09 06:48:00", comment: "买了根棒棒糖"}
app.post("/createBill", (req, res) => {
  const { user_id, type, money, time, comment } = req.body;
  connection.query(
    `
  INSERT INTO bill 
  ( user_id, type, money, time, comment ) 
  VALUES 
  (${user_id}, ${type}, ${money}, '${time}', '${comment}')
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});

// 删除账单
app.delete("/deleteBill/:id", (req, res) => {
  connection.query(
    `
  DELETE FROM bill WHERE id=${req.params.id};
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});

// 更新账单 {money: 1, comment: '备注', type: 2, time: '2023-08-08 06:48:00'}
app.put("/updateBill/:id", (req, res) => {
  const result = updateOnDemand(req.body);
  connection.query(
    `
  UPDATE bill SET ${result} WHERE id=${req.params.id};
  `,
    (err, results) => {
      if (err) console.log(err);
      res.send(api());
    }
  );
});
