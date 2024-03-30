const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");


const app = express();
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.json());




//Home page
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/./src/view/index.html");
});

//route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});

module.exports = app;
