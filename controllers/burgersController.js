const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        const burgers = { burgers: data };
        console.log(burgers);
        res.render("index", burgers);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], (result) => {
        res.json({ id: result.insertId });
    })
})

router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    burger.updateOne({ devoured: req.body.devoured }, condition, (data) => {
        if (data.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;