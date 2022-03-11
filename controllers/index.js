const router = require("express").Router()
const homeroutes = require("./homeroutes")
const apiRoute = require("./api")
router.use("/", homeroutes)
router.use("/api", apiRoute)
module.exports = router