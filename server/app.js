const express = require("express");
const app = express();
const mongoose = require("mongoose");
const knightsRouter = require("./src/routes/KnightsRoutes");

//configure mongoose
mongoose.connect('mongodb://localhost:27017/knights-challenge',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
 
//middleware
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api/knights", knightsRouter);
 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;