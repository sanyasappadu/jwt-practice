const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const authRoutes = require('./Routes/Auth.route')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000 
app.get('/', async(req, res, next)=>{
res.send("hello from express");
});

app.use('/auth', authRoutes);
app.use(async (req, res, next) => {
  // const error = new Error('Not fount');
  // error.status = 404
  // next(error);

  // next(createError.NotFound())

  next(createError.NotFound('this route does not exist'))
})
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));