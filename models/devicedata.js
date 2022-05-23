const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Device model

const deviceSchema = new Schema({
  signalType: {
    type: String,
    trim: true,
  },
  deviceAddress: String,
  gateway: String,
  spreadingFactor: {
    type: Number,
  },
  rssi: {
    type: Number,
  },
  SNR: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Device = mongoose.model('devicedata', deviceSchema);

module.exports = Device;
