import { useQuery } from "react-query";
import {
  fetchCustomerRegistration,
  fetchPackagePercent,
  fetchPackageReport,
  fetchTopPackage,
  getPackagePercent,
} from "../api/statistics";

export const useGetPackageReport = ({ startDate, endDate }) => {
  return useQuery(
    ["package-report", startDate, endDate],
    () => fetchPackageReport({ startDate, endDate }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetCustomerRegistration = ({ startDate, endDate }) => {
  return useQuery(
    ["customer-registration", startDate, endDate],
    () => fetchCustomerRegistration({ startDate, endDate }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetTopPackage = ({ startDate, endDate }) => {
  return useQuery(
    ["top-package", startDate, endDate],
    () => fetchTopPackage({ startDate, endDate }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetPackagePercent = ({ startDate, endDate }) => {
  return useQuery(
    ["package-percent", startDate, endDate],
    () => fetchPackagePercent({ startDate, endDate }),
    {
      refetchOnWindowFocus: false,
    }
  );
};
