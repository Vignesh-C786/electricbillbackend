let mongoose = require('mongoose'),
  express = require('express'),
  userRouter = express.Router();
  const moment = require('moment');

// User Model
let userSchema = require('../models/user');

// CREATE User
userRouter.route('/').post((req, res, next) => {
  console.log("Request body => ",req);
  req.body["date"] = moment().format("DD/MM/YYYY");
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ User
userRouter.route('/').get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single User
userRouter.route('/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update User
userRouter.route('/update/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User updated successfully !')
    }
  })
})

// Delete User
userRouter.route('/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRouter;