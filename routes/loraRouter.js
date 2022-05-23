const express = require('express');
const loraControllers = require('../controllers/loraControllers');

const router = express.Router();

router.route('/post-lora-data').post(loraControllers.loadData);
router.route('/get-sf-count').get(loraControllers.getSFNumbers);
router.route('/get-sf-count/:sf').get(loraControllers.getSFByDistance);
router.route('/get-all-data').get(loraControllers.getAllData);

router
  .route('/spreadFactor/:sf/distance/:distance')
  .get(loraControllers.getData);
router.route('/delete/singal/:id').delete(loraControllers.deleteData);

module.exports = router;
