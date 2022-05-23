const Device = require('../models/devicedata');

exports.bringDataFromDevice = async (req, res, next) => {
  try {
    const signalType = req.body.type;
    const deviceAddress = req.body.payload.devEUI;
    const spreadingFactor =
      req.body.payload.txInfo.loRaModulationInfo.spreadingFactor;
    const rssi = req.body.payload.rxInfo[0].rssi;
    const SNR = req.body.payload.rxInfo[0].loRaSNR;
    const gateway = req.body.payload.rxInfo[0].gatewayID;

    if (signalType !== 'up') {
      return next(
        res.status(404).json({
          status: 'notUp',
        })
      );
    }
    const newSignal = await Device.create({
      signalType,
      deviceAddress,
      spreadingFactor,
      rssi,
      SNR,
      gateway,
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

exports.getAllDeviceData = async (req, res) => {
  try {
    const allSignals = await Device.find();
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
