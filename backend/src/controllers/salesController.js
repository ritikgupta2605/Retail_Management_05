import { loadSalesData } from '../services/dataService.js';
import { 
  searchSalesData, 
  filterSalesData, 
  sortSalesData, 
  paginateSalesData 
} from '../services/salesService.js';

let salesData = [];

// Load data on initialization
(async () => {
  salesData = await loadSalesData();
  console.log(`Loaded ${salesData.length} sales records`);
})();

export const getSalesData = (req, res) => {
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

    let filteredData = [...salesData];

    // Apply search
    if (search) {
      filteredData = searchSalesData(filteredData, search);
    }

    // Apply filters
    const filters = {
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      dateFrom: dateFrom || null,
      dateTo: dateTo || null
    };

    filteredData = filterSalesData(filteredData, filters);

    // Apply sorting
    if (sortBy) {
      filteredData = sortSalesData(filteredData, sortBy);
    }

    // Get total count before pagination
    const totalRecords = filteredData.length;

    // Apply pagination
    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);
    const paginatedData = paginateSalesData(filteredData, pageNum, pageSizeNum);

    res.json({
      success: true,
      data: paginatedData.data,
      pagination: {
        currentPage: pageNum,
        pageSize: pageSizeNum,
        totalRecords,
        totalPages: paginatedData.totalPages
      }
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
