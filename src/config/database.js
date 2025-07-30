const mongoose = require('mongoose');
const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://kakkerlakarthik:Karthik%40123@lernmango.3iqjdoa.mongodb.net/devTinder');
    console.log('MongoDB connected successfully 🚀');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);   
};
};
module.exports = connectDatabase;
