import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../data/sales_data.csv');
    let recordCount = 0;
    const MAX_RECORDS = 1000; // Limit to 100k records for performance

    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      console.warn('CSV file not found. Using sample data.');
      resolve(generateSampleData());
      return;
    }

    console.log('Loading CSV data...');

    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (data) => {
        // Limit the number of records for performance
        if (recordCount >= MAX_RECORDS) {
          return;
        }
        recordCount++;
        // Parse and transform the data
        const record = {
          transactionId: data['Transaction ID'] || data.transactionId || '',
          customerId: data['Customer ID'] || data.customerId || '',
          customerName: data['Customer Name'] || data.customerName || '',
          phoneNumber: data['Phone Number'] || data.phoneNumber || '',
          gender: data['Gender'] || data.gender || '',
          age: parseInt(data['Age'] || data.age) || 0,
          customerRegion: data['Customer Region'] || data.customerRegion || '',
          customerType: data['Customer Type'] || data.customerType || '',
          productId: data['Product ID'] || data.productId || '',
          productName: data['Product Name'] || data.productName || '',
          brand: data['Brand'] || data.brand || '',
          productCategory: data['Product Category'] || data.productCategory || '',
          tags: data['Tags'] || data.tags || '',
          quantity: parseInt(data['Quantity'] || data.quantity) || 0,
          pricePerUnit: parseFloat(data['Price per Unit'] || data.pricePerUnit) || 0,
          discountPercentage: parseFloat(data['Discount Percentage'] || data.discountPercentage) || 0,
          totalAmount: parseFloat(data['Total Amount'] || data.totalAmount) || 0,
          finalAmount: parseFloat(data['Final Amount'] || data.finalAmount) || 0,
          date: data['Date'] || data.date || '',
          paymentMethod: data['Payment Method'] || data.paymentMethod || '',
          orderStatus: data['Order Status'] || data.orderStatus || '',
          deliveryType: data['Delivery Type'] || data.deliveryType || '',
          storeId: data['Store ID'] || data.storeId || '',
          storeLocation: data['Store Location'] || data.storeLocation || '',
          salespersonId: data['Salesperson ID'] || data.salespersonId || '',
          employeeName: data['Employee Name'] || data.employeeName || ''
        };
        results.push(record);
      })
      .on('end', () => {
        if (recordCount >= MAX_RECORDS) {
          console.log(`CSV file successfully processed: ${results.length} records (limited from ${recordCount}+ total records for performance)`);
        } else {
          console.log(`CSV file successfully processed: ${results.length} records`);
        }
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
};

// Generate sample data if CSV is not available
const generateSampleData = () => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const genders = ['Male', 'Female', 'Other'];
  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books'];
  const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'];
  const tags = ['Premium', 'Budget', 'Trending', 'Clearance', 'New Arrival'];
  const orderStatuses = ['Completed', 'Pending', 'Cancelled', 'Processing'];
  const deliveryTypes = ['Home Delivery', 'Store Pickup', 'Express'];

  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      customerId: `CUST${String(i).padStart(4, '0')}`,
      customerName: `Customer ${i}`,
      phoneNumber: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: Math.floor(18 + Math.random() * 62),
      customerRegion: regions[Math.floor(Math.random() * regions.length)],
      customerType: Math.random() > 0.5 ? 'Regular' : 'VIP',
      productId: `PROD${String(i).padStart(4, '0')}`,
      productName: `Product ${i}`,
      brand: `Brand ${Math.floor(Math.random() * 20) + 1}`,
      productCategory: categories[Math.floor(Math.random() * categories.length)],
      tags: tags[Math.floor(Math.random() * tags.length)],
      quantity: Math.floor(1 + Math.random() * 10),
      pricePerUnit: parseFloat((100 + Math.random() * 900).toFixed(2)),
      discountPercentage: parseFloat((Math.random() * 30).toFixed(2)),
      totalAmount: 0,
      finalAmount: 0,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toISOString().split('T')[0],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      orderStatus: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      deliveryType: deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)],
      storeId: `STORE${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
      storeLocation: `Location ${Math.floor(Math.random() * 10) + 1}`,
      salespersonId: `EMP${String(Math.floor(Math.random() * 50) + 1).padStart(4, '0')}`,
      employeeName: `Employee ${Math.floor(Math.random() * 50) + 1}`
    });
    
    // Calculate amounts
    const record = data[data.length - 1];
    record.totalAmount = parseFloat((record.quantity * record.pricePerUnit).toFixed(2));
    record.finalAmount = parseFloat((record.totalAmount * (1 - record.discountPercentage / 100)).toFixed(2));
  }
  
  return data;
};
