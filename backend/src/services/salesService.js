import Sale from '../models/Sale.js';

/**
 * Get sales data with search, filter, sort, and pagination
 */
export const getSales = async ({
  search,
  customerRegion,
  gender,
  ageMin,
  ageMax,
  productCategory,
  tags,
  paymentMethod,
  dateFrom,
  dateTo,
  sortBy,
  page = 1,
  pageSize = 10
}) => {
  const query = {};

  // Search (Case-insensitive full-text search)
  if (search && search.trim() !== '') {
    const term = search.trim();
    query.$or = [
      { customerName: { $regex: term, $options: 'i' } },
      { phoneNumber: { $regex: term, $options: 'i' } }
    ];
  }

  // Filters
  if (customerRegion && customerRegion.length > 0) {
    query.customerRegion = { $in: customerRegion };
  }

  if (gender && gender.length > 0) {
    query.gender = { $in: gender };
  }

  if (ageMin !== null || ageMax !== null) {
    query.age = {};
    if (ageMin !== null) query.age.$gte = ageMin;
    if (ageMax !== null) query.age.$lte = ageMax;
  }

  if (productCategory && productCategory.length > 0) {
    query.productCategory = { $in: productCategory };
  }

  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }

  if (paymentMethod && paymentMethod.length > 0) {
    query.paymentMethod = { $in: paymentMethod };
  }

  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) query.date.$gte = new Date(dateFrom);
    if (dateTo) query.date.$lte = new Date(dateTo);
  }

  // Sorting
  let sort = {};
  if (sortBy) {
    switch (sortBy) {
      case 'date_desc':
        sort = { date: -1 };
        break;
      case 'date_asc':
        sort = { date: 1 };
        break;
      case 'amount_desc':
        sort = { finalAmount: -1 };
        break;
      case 'amount_asc':
        sort = { finalAmount: 1 };
        break;
      default:
        sort = { date: -1 }; // Default sort
    }
  } else {
    sort = { date: -1 };
  }

  // Pagination
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const totalRecords = await Sale.countDocuments(query);
  const sales = await Sale.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Calculate metrics
  const metricsAggregation = await Sale.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalUnits: { $sum: "$quantity" },
        totalAmount: { $sum: "$finalAmount" },
        totalDiscount: { $sum: { $subtract: ["$totalAmount", "$finalAmount"] } }
      }
    }
  ]);

  const metrics = metricsAggregation.length > 0 ? metricsAggregation[0] : { totalUnits: 0, totalAmount: 0, totalDiscount: 0 };

  return {
    data: sales,
    pagination: {
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
      currentPage: page,
      pageSize
    },
    metrics: {
      totalUnits: metrics.totalUnits,
      totalAmount: metrics.totalAmount,
      totalDiscount: metrics.totalDiscount
    }
  };
};
