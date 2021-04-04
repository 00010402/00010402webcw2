const fs = require('fs')
const path = require('path')

const express = require("express")
const router = express.Router()

const DbContext = require("../services/db")

const dbc = new DbContext()
dbc.useCollection("employees.json")



router.get('/:id/delete', (req, res) => {
    dbc.deleteOne(
        req.params.id,
        () => res.redirect('/')),
        () => res.sendStatus(500)
})

module.exports = router;

