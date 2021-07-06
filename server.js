const express = require("express");
const cors = require("cors");
const { getHouses, createHouse, deleteHouse, updateHouse } = require("./controllers/controller");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/houses", getHouses);
app.post("/api/houses", createHouse);
app.put("/api/houses/:id", updateHouse);
app.delete("/api/houses/:id", deleteHouse);

const port = 4004;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});