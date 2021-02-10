let mongoose = require('mongoose'),
  express = require('express'),
  billRouter = express.Router();
const moment = require('moment');

// req.body Model
let billSchema = require('../models/bill');

// CREATE Bills
billRouter.route('/').post((req, res, next) => {
  console.log("Request body => ", req);
  let date = moment().format("DD/MM/YYYY");
  req.body["date"] = date;
  let usage = req.body.currentreading - req.body.previousreading;
  req.body["units"] = usage;
  req.body["duedate"] = moment(date, "DD/MM/YYYY").add(14, 'days').format("DD/MM/YYYY");
  let billAmount = 0;

  if (usage >= 100 && usage <= 200) {
    let consumed = usage - 100;
    billAmount = (20 + (consumed * 1.5));
    req.body["amount"] = billAmount;

  } else if (usage > 200 && usage <= 500) {
    let consumed = usage - 100;
    billAmount = (30 + ((100 * 2) + ((consumed - 100) * 3)));
    req.body["amount"] = billAmount;

  } else if (usage > 500) {
    let consumed = usage - 100;
    let final = consumed - 400;
    billAmount = (50 + ((100 * 3.5) + ((consumed - 400) * 4.6) + (final * 6.6)));
    req.body["amount"] = billAmount;

  } else {
    req.body["amount"] = billAmount;
  }

  billSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// Get Bills
billRouter.route('/').get((req, res) => {
  billSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single user bill
billRouter.route('/:id').get((req, res) => {
  billSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update bill
billRouter.route('/update/:id').put((req, res, next) => {
  billSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Bill updated successfully !')
    }
  })
})

// Delete bill
billRouter.route('/:id').delete((req, res, next) => {
  billSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = billRouter;