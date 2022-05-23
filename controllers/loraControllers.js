const Lora = require('../models/loradata');

exports.loadData = async (req, res) => {
  try {
    const signalType = req.body.signalType;
    const deviceAddress = req.body.deviceAddress;
    const spreadingFactor = req.body.spreadingFactor;
    const rssi = req.body.rssi;
    const SNR = req.body.SNR;
    const distance = req.body.distance;
    const measuringLocation = req.body.measureamentsPlace;
    const gateway = req.body.gateway;
    const newSignal = await Lora.create({
      signalType,
      deviceAddress,
      gateway,
      spreadingFactor,
      rssi,
      SNR,
      distance,
      measuringLocation,
    });

    res.status(200).json({
      status: 'success',
      data: {
        signal: newSignal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const allSignals = await Lora.find();
    res.status(200).json({
      status: 'success',
      dataLength: allSignals.length,
      data: {
        allSignals,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'err',
      message: err,
    });
  }
};

exports.getData = async (req, res, next) => {
  try {
    const { sf, distance } = req.params;
    const signals = await Lora.find({
      spreadingFactor: sf,
      distance: distance,
    });
    res.status(200).json({
      status: 'success',
      signals: signals.length,
      data: {
        signals,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteData = async (req, res, next) => {
  try {
    const signal = await Lora.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSFNumbers = async (req, res, next) => {
  try {
    const table = await Lora.aggregate([
      // {
      //   $unwind: '$spreadingFactor',
      // },
      {
        $group: {
          _id: '$spreadingFactor',
          numberSF: { $sum: 1 },
          deviceAddress: { $push: '$deviceAddress' },
        },
      },
      {
        $addFields: { SF: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          SF: +1,
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: { table },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSFByDistance = async (req, res, next) => {
  try {
    const sf = req.params.sf * 1;
    const table = await Lora.aggregate([
      {
        $match: { spreadingFactor: sf },
      },
      {
        $group: {
          _id: '$distance',
          numberOfDistances: { $sum: 1 },
          avgRSSI: { $avg: '$rssi' },
          minRSSI: { $min: '$rssi' },
          maxRSSI: { $max: '$rssi' },
          avgSNR: { $avg: '$SNR' },
        },
      },
      {
        $addFields: { Distance: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          Distance: +1,
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: { table },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
