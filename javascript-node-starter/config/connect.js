import mongoose from 'mongoose';

async function connectToDB() {
  try {
    const URL = process.env.MONGOURL;
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}
export default connectToDB;
