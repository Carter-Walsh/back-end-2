const { send } = require("process");
const houses = require("../db.json");

let houseId = 4;

const findTheIndex = (id) => {
    return houses.findIndex(house => house.id === parseInt(id));
}

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
        const { id } = req.params;

        const index = findTheIndex(id);  
        console.log(index);      

        if (index === -1) {
            res.status(400).send({error: "House not found"})
        } else {
            houses.splice(index, 1);
            res.status(200).send(houses);
        }
    },
    createHouse: (req, res) => {
        const { address, price, imageURL} = req.body;

        const newHouse = {id: houseId, address, price, imageURL};

        if (!newHouse) {
            res.status(400).send({error: "Invalid house entry"})
        } else {
            houses.push(newHouse);
            res.status(200).send(newHouse);
            houseId++;
        }
    }, 
    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        
        const index = findTheIndex(id);

        if (type === "plus") {
            houses[index].price += 10000;
            res.status(200).send(houses);
        } else if (type === "minus" && houses[index].price > 9999) {
            houses[index].price -= 10000;
            res.status(200).send(houses);
        } else {
            res.status(400).send({error: "House not found"});
        }
    }
};

