import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sale from '../src/models/Sale.js';
import connectDB from '../src/config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions for random data generation
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

const regions = ['North', 'South', 'East', 'West', 'Central'];
const genders = ['Male', 'Female', 'Other'];
const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'];
const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking', 'Wallet'];
const statuses = ['Completed', 'Pending', 'Cancelled', 'Returned'];
const deliveryTypes = ['Standard', 'Express', 'Same Day'];
const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Puma', 'Zara', 'H&M', 'Dell'];
const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Diya', 'Saanvi', 'Ananya', 'Aadhya', 'Pari', 'Anvi', 'Myra', 'Riya', 'Aarohi', 'Anika'];
const lastNames = ['Kumar', 'Singh', 'Sharma', 'Patel', 'Gupta', 'Mishra', 'Yadav', 'Reddy', 'Nair', 'Kapoor'];

const generateRecord = (index) => {
  const quantity = randomInt(1, 5);
  const pricePerUnit = randomInt(100, 5000);
  const discountPercentage = randomInt(0, 30);
  const totalAmount = quantity * pricePerUnit;
  const finalAmount = totalAmount * (1 - discountPercentage / 100);
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, 365)); // Random date within last year

  return {
    transactionId: `TRX-${Date.now()}-${index}-${randomInt(1000, 9999)}`,
    customerId: `CUST-${randomInt(10000, 99999)}`,
    customerName: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
    phoneNumber: `9${randomInt(100000000, 999999999)}`,
    gender: randomElement(genders),
    age: randomInt(18, 70),
    customerRegion: randomElement(regions),
    customerType: randomElement(['New', 'Returning', 'VIP']),
    productId: `PROD-${randomInt(1000, 9999)}`,
    productName: `Product ${randomInt(1, 100)}`,
    brand: randomElement(brands),
    productCategory: randomElement(categories),
    tags: 'general, sale',
    quantity: quantity,
    pricePerUnit: pricePerUnit,
    discountPercentage: discountPercentage,
    totalAmount: totalAmount,
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    date: date,
    paymentMethod: randomElement(paymentMethods),
    orderStatus: randomElement(statuses),
    deliveryType: randomElement(deliveryTypes),
    storeId: `STORE-${randomInt(1, 50)}`,
    storeLocation: `Location ${randomInt(1, 20)}`,
    salespersonId: `SP-${randomInt(100, 999)}`,
    employeeName: `Employee ${randomInt(1, 100)}`
  };
};

const seedData = async () => {
  await connectDB();

  try {
    console.log('Clearing existing data...');
    await Sale.deleteMany({});
    console.log('Cleared existing data.');

    const TOTAL_RECORDS = 600000;
    const BATCH_SIZE = 5000;
    let count = 0;

    console.log(`Starting generation of ${TOTAL_RECORDS} records...`);

    for (let i = 0; i < TOTAL_RECORDS; i += BATCH_SIZE) {
      const batch = [];
      const currentBatchSize = Math.min(BATCH_SIZE, TOTAL_RECORDS - i);

      for (let j = 0; j < currentBatchSize; j++) {
        batch.push(generateRecord(i + j));
      }

      await Sale.insertMany(batch);
      count += batch.length;
      
      if (count % 100000 === 0) {
        console.log(`Inserted ${count} records...`);
      }
    }

    console.log('Data seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
