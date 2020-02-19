const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const hbsMiddleware = require("express-handlebars");
const fs = require("fs");
const _ = require("lodash");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const questionsPath = path.join(__dirname, "../questions.json");

const questionsJson = () => {
  return JSON.parse(fs.readFileSync(questionsPath).toString());
};

const newQuestionId = () => {
  const questions = questionsJson();
  const maxQuestion = _.maxBy(questions, question => question.id);
  return maxQuestion.id + 1;
};

const updateQuestionDataJson = questions => {
  const data = questions;
  fs.writeFileSync(questionsPath, JSON.stringify(data));
};

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

// required for step three
const getLaunchers = () => {
  const launcherPath = path.join(__dirname, "../launchers.json");
  return JSON.parse(fs.readFileSync(launcherPath));
};

app.get("/api/v1/launchers", (req, res) => {
  const jsonString = fs
    .readFileSync(path.join(__dirname, "../launchers.json"))
    .toString();
  res.json(JSON.parse(jsonString));
});

app.get("/api/v1/launchers/:id", (req, res) => {
  const launcher = getLaunchers().find(person => {
    return person.id == req.params.id;
  });
  if (launcher) {
    res.json(launcher);
  } else {
    res.status(404);
  }
});

app.get("/api/v1/questions", (req, res) => {
  const jsonString = fs
    .readFileSync(path.join(__dirname, "../questions.json"))
    .toString();
  res.json(JSON.parse(jsonString));
});

app.post("/api/v1/questions", (req, res) => {
  const { question, answer } = req.body;
  if (question && answer) {
    const newQuestion = {
      id: newQuestionId(),
      question: question,
      answer: answer
    };
    const questions = questionsJson();
    questions.push(newQuestion);
    updateQuestionDataJson(questions);
    res.status(201).json(newQuestion);
  } else {
    res.status(422).json({ name: ["Fields can't be blank"] });
  }
});

// set to wildcard so that upon refresh after going through react
// router links that it remains static on the page ******
// need to make sure that the dirnames are pointing to the correct file
// works if there is now hbs templates and uses pure /public
app.get("*", (req, res) => {
  const index = fs.readFileSync(
    path.join(__dirname, "../public/index.html").toString()
  );
  res
    .status(200)
    .type("text/html")
    .send(index);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...");
});

module.exports = app;
