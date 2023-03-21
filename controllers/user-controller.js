const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((getAllUserData) => res.json(getAllUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    getUsersById({params}, res) {
        User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((getUserByIdData) => {
        if (!getUserByIdData) {
          res.status(404).json({ message: "No user with this id was found!" });
          return;
        }
        res.json(getUserByIdData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    createUser({body}, res) {
        User.create(body)
      .then((createUserData) => res.json(createUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    updateUser({params, body}, res) {
        ser.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
          })
            .then((createUserData) => {
              if (!createUserData) {
                res.status(404).json({ message: "No user with this id was found!" });
                return;
              }
              res.json(createUserData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    deleteUser({params}, res) {
        User.fondOneAndDelete({ _id: params.id })
      .then((deleteUserData) => {
        if (!deleteUserData) {
          res.status(404).json({ message: "No User found with this Id!" });
          return;
        }
        res.json(deleteUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: {friends: params.friendsId } },
            { new: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendsId } },
            { new: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
    };

module.exports = userController;