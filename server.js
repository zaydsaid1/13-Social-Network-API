const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const app = express()
const PORT = process.enc.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set("debug", true)

app.listen(PROT, () => console.log(`Now listening on http://localhost:${PORT}`))