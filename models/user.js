const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  shopno: {
    type: Number
  },
  shopname: {
    type: String
  },
  meterno: {
    type: Number
  },
  date: {
    type: String
  }
}, {
    collection: 'user'
  })

module.exports = mongoose.model('User', userSchema)