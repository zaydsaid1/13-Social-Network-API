const router = require("express").Router()

const {} = require("../../controllers/thought-controller");

router.route("/").get().post()

router.route("/:id").get().put().delete()

router.route("/:thoughtId/reactions").post()

router.route("/:thoughtId/reactions/:reactionId").delete()

module.exports = router; 