const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PORT = 5111;

app.all("/", (req, res) => {
  //   console.log("request=====>", req);
  //   console.log("response====>", res);

  res.send("I'm UP!");
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];
//READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

//CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  console.log(req.body);
  todos.push(newTodo);
  res.status(201).json({
    message: "new Todo Added!",
  });
});

//UPDATE
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todo = todos.findIndex((td) => td.id === req.params.id);
  console.log(todo);
  if (todo !== -1) {
    todos[todo] = {
      id: req.params.id,
      ...newTodoData,
    };
  }
  res.json({
    message: `todos updated with id ${req.params.id}`,
  });
});
//DELETE
app.delete("/todos/:id", (req, res) => {
  const paramId = req.params.id;
  const todoId = todos.findIndex((td) => td.id === paramId);
  if (todoId !== -1) {
    todos.splice(todoId, 1);
    res.status(201).json({
      message: `todo with id no ${paramId} deleted successfully!`,
    });
  } else {
    res.status(400).json({
      message: "Todo with the requested id doesn't exists",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
