import { getSales } from '../services/salesService.js';

export const getSalesData = async (req, res) => {
  try {
    const {
      search = '',
      customerRegion = '',
      gender = '',
      ageMin = '',
      ageMax = '',
      productCategory = '',
      tags = '',
      paymentMethod = '',
      dateFrom = '',
      dateTo = '',
      sortBy = '',
      page = '1',
      pageSize = '10'
    } = req.query;

    const filters = {
      search,
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
      sortBy,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    };

    const result = await getSales(filters);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      metrics: result.metrics
    });
  } catch (error) {
    console.error('Error in getSalesData:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
};
