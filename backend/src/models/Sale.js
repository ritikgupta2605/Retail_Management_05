import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  customerId: { type: String },
  customerName: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  age: { type: Number },
  customerRegion: { type: String },
  customerType: { type: String },
  productId: { type: String },
  productName: { type: String },
  brand: { type: String },
  productCategory: { type: String },
  tags: { type: String },
  quantity: { type: Number },
  pricePerUnit: { type: Number },
  discountPercentage: { type: Number },
  totalAmount: { type: Number },
  finalAmount: { type: Number },
  date: { type: Date },
  paymentMethod: { type: String },
  orderStatus: { type: String },
  deliveryType: { type: String },
  storeId: { type: String },
  storeLocation: { type: String },
  salespersonId: { type: String },
  employeeName: { type: String }
}, {
  timestamps: true
});

// Add indexes for frequently searched/filtered fields
saleSchema.index({ customerName: 'text', phoneNumber: 'text' });
saleSchema.index({ customerRegion: 1 });
saleSchema.index({ gender: 1 });
saleSchema.index({ age: 1 });
saleSchema.index({ productCategory: 1 });
saleSchema.index({ date: 1 });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
