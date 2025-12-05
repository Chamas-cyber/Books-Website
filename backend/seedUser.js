import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { mongoURL } from './config.js';
import { User } from './models/userModel.js';

dotenv.config();

const EMAIL = 'hadi.shamas41@gmail.com';
const PASSWORD = 'Chamas17';

async function seed() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB for seeding');

    const existing = await User.findOne({ email: EMAIL });
    if (existing) {
      // Update password if user exists
      existing.password = await bcrypt.hash(PASSWORD, 10);
      await existing.save();
      console.log('User password updated:', EMAIL);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(PASSWORD, 10);
    await User.create({ email: EMAIL, password: hashed });
    console.log('Seed user created:', EMAIL);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
