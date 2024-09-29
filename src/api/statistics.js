import { axiosClient } from "../utils/axios";

const fetchData = async (endpoint, { startDate, endDate }) => {
  try {
    const { data } = await axiosClient.get(endpoint, {
      params: {
        StartDate: startDate,
        EndDate: endDate,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

export const fetchPackageReport = async (params) =>
  fetchData("/api/statistics/package-report", params);
export const fetchCustomerRegistration = async (params) =>
  fetchData("/api/statistics/customer-registration", params);
export const fetchTopPackage = async (params) =>
  fetchData("/api/statistics/top-package", params);
export const fetchPackagePercent = async (params) =>
  fetchData("/api/statistics/package-percent", params);
