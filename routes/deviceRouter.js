const express = require('express');
const deviceControllers = require('../controllers/deviceControllers');

const router = express.Router();

router.route('/post-device-data').post(deviceControllers.bringDataFromDevice);
router.route('/get-all-device-data').get(deviceControllers.getAllDeviceData);

module.exports = router;
