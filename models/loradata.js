const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Lora model

const loraSchema = new Schema({
  signalType: {
    type: String,
    trim: true,
  },
  deviceAddress: String,
  gateway: String,
  spreadingFactor: {
    type: Number,
    required: [true, 'A data must have a spreadFactor'],
  },
  rssi: {
    type: Number,
    required: [true, 'A data must have a RSSI value'],
  },
  SNR: Number,
  distance: {
    type: Number,
    required: [true, 'A data must have a distance'],
  },
  measuringLocation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lora = mongoose.model('loracollectiondata', loraSchema);

module.exports = Lora;
