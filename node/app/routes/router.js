const express = require("express")
const router = express.Router()

const port = process.env.port || 3005

router.get("/api", (req, res)=> {
    res.json({
        "All Champs": `http://localhost:${port}/api/champ`
    })
})

router.use("/api/champ", require("./api/"))

router.get("*", (req, res)=> {
    if (req.url == "/favicon.ico") {
        res.end()
    } else {
        res.send("<h1>404 ERROR. This page does not exist.<h1>")
    }
})

module.exports = router