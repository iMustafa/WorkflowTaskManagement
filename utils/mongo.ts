import mongoose from 'mongoose';
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const init = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      options
    )
    console.log('>> Connected to MongoDB')
  } catch (e) {
    console.log(`Error while connecting to MongoDB: ${e}`);
    return process.exit(0)
  }
};

export default {
  init,
};