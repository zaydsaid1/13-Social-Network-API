const router = require('express').Router();

const {userRoutes, thoughtRoutes} = require("./api")


router.use("/api", userRoutes)
router.use("/api", thoughtRoutes)

module.exports = router;