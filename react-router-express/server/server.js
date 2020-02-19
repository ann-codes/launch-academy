const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const hbsMiddleware = require("express-handlebars")
const fs = require("fs")
const _ = require("lodash")
const express = require("express")
const app = express()
app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")
app.use(logger("dev"))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cerealPath = path.join(__dirname, "../data/cereal.json")
const getCereals = () => {
  return JSON.parse(fs.readFileSync(cerealPath))
}
const milkPath = path.join(__dirname, "../data/milk.json")
const getMilks = () => {
  return JSON.parse(fs.readFileSync(milkPath))
}
app.get('/', (req, res) => {
  res.render("home")
})
app.get("/milks", (req,res) => {
  res.render("home")
})
app.get('/cereals/:id', (req, res) => {
  res.render("home")
})
app.get('/api/v1/cereals', (req, res) => {
  res.json(getCereals())
})
app.get('/api/v1/milks', (req,res) => {
  res.json(getMilks())
})
app.get('/api/v1/cereals/:id', (req, res) => {
  const cereal = getCereals().find((cereal) => {
    return cereal.id == req.params.id
  })
  if(cereal) {
    res.json(cereal)
  }
  else {
    res.status(404)
  }
})
// app.get('/api/v1/milks/:id', (req, res) => {
//   const milk = getMilks().find((milk) => {
//     return milk.id == req.params.id
//   })
//   if(milk) {
//     res.json(milk)
//   }
//   else {
//     res.status(404)
//   }
// })
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})
 module.exports = app


