require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const mongoString = process.env.DATABASE_URL;

const app = express();

app.use(helmet());
app.disable("x-powered-by");

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use("/uploads", express.static("uploads"));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API." });
});

const voiture = require("./Routes/voiture.routes");
const marque = require("./Routes/marque.routes");
const model = require("./Routes/model.routes");
const entreprise = require("./Routes/entreprise.routes");
const auth = require("./Routes/auth.routes");

app.use(`/api/${process.env.V}/voiture`, voiture);
app.use(`/api/${process.env.V}/marque`, marque);
app.use(`/api/${process.env.V}/model`, model);
app.use(`/api/${process.env.V}/entreprise`, entreprise);
app.use(`/api/${process.env.V}/auth`, auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
