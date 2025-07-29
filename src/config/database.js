const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://kakkerlakarthik:Karthik%40123@lernmango.3iqjdoa.mongodb.net/devTinder');
    console.log('MongoDB connected successfully 🚀');
  } catch (err) {
    console.error('MongoDB connection error ❌:', err.message);
    
};
}
module.exports = connectDatabase;
