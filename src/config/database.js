const mangoose = require('mongoose');
const connectDatabase = async () => {
    await mangoose.connect('mongodb+srv://kakkerlakarthik:Karthik%40123@lernmango.3iqjdoa.mongodb.net/devTinder')
}
module.exports = connectDatabase;