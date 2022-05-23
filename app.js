const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const loraRouter = require('./routes/loraRouter');
const deviceRouter = require('./routes/deviceRouter');
const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/lora', loraRouter);
app.use('/api/device', deviceRouter);
module.exports = app;
