const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { 
  dbName : 'auth_jwt',
  // useNewUrlParser : true,
})
  .then(() => {
    console.log('mongodb connected.')
  })
  .catch((err) => console.log(err.message))

mongoose.connection.on('connected', ()=>{
  console.log('mongoose connected to db');
})

mongoose.connection.on('err', ()=>{
  console.log(err.message);
})

mongoose.connection.on('disconnected', ()=>{
  console.log('mongoose connected to disconnected.');
})

process.on('SIGINT', async ()=> {
  await mongoose.connection.close();
  process.exit(0);
})