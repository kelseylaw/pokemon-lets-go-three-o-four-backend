const {mapRegions} = require("./mapRegion");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({credentials: true, origin: true}));

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/mapRegion", (req, res) => {
  res.json({ data: mapRegions });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))