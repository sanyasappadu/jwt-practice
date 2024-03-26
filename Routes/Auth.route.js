const express = require('express');
const router = express.Router();
const createError = require('http-errors');
// const User = require('../models/User')
const { authSchema } = require('../helpers/validation_schema')
router.post('/register', async(req, res, next)=>{
  try {
    const {email, password} = req.body
    // if(!email || !password) throw createError.BadRequest()
    const result = await authSchema.validateAsync(req.body)
    console.log(result);
    const doseExist = await User.findOne({ email : email });
  if(doseExist) throw createError.Conflict(`${email} is already beed registered`)
  const user =new User ({ email, password})
  const savedUser = await user.save()

  res.send(savedUser)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async(req, res, next)=>{
  res.send('login route');
})

router.post('/refresh-token', async(req, res, next)=>{
  res.send('refresh-token route');
})

router.delete('/logout', async(req, res, next)=>{
  res.send('logout route');
})

module.exports = router;