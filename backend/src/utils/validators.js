/**
 * Validate and sanitize query parameters
 */
export const validateQueryParams = (params) => {
  const validated = {};

  // Validate search term
  if (params.search) {
    validated.search = String(params.search).trim().slice(0, 100);
  }

  // Validate page number
  const page = parseInt(params.page);
  validated.page = (page && page > 0) ? page : 1;

  // Validate page size
  const pageSize = parseInt(params.pageSize);
  validated.pageSize = (pageSize && pageSize > 0 && pageSize <= 100) ? pageSize : 10;

  // Validate age range
  if (params.ageMin) {
    const ageMin = parseInt(params.ageMin);
    validated.ageMin = (ageMin >= 0 && ageMin <= 150) ? ageMin : null;
  }

  if (params.ageMax) {
    const ageMax = parseInt(params.ageMax);
    validated.ageMax = (ageMax >= 0 && ageMax <= 150) ? ageMax : null;
  }

  // Validate date range
  if (params.dateFrom) {
    const dateFrom = new Date(params.dateFrom);
    validated.dateFrom = !isNaN(dateFrom.getTime()) ? params.dateFrom : null;
  }

  if (params.dateTo) {
    const dateTo = new Date(params.dateTo);
    validated.dateTo = !isNaN(dateTo.getTime()) ? params.dateTo : null;
  }

  return validated;
};

/**
 * Sanitize string input
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  return String(str).trim().replace(/[<>]/g, '');
};
