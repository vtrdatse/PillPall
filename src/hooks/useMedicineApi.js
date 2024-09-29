import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getListMedicine,
  getMedicine,
  postCreateMedicine,
  importMedicine,
  deleteMedicine,
  putUpdateMedicine,
  postAddMedicineToBrandWithPrice,
  putAddMedicineToBrandWithPrice,
  deleteMedicineFromBrand,
} from "../api/medicine";

export const useGetListMedicine = (params) =>
  useQuery(["getListMedicine", params], () => getListMedicine(params), {
    refetchOnWindowFocus: false,
  });

export const useGetMedicine = (id) =>
  useQuery(["getMedicine", id], () => getMedicine(id), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

export const useCreateMedicine = () =>
  useMutation((data) => postCreateMedicine(data));

export const useImportMedicine = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => importMedicine(data), {
    onSuccess: () => {
      // Invalidate and refetch the data after a successful import
      queryClient.invalidateQueries('getListMedicine');
    },
  });
};

export const useDeleteMedicine = (id) => useMutation(() => deleteMedicine(id));

export const useUpdateMedicine = (id) =>
  useMutation((data) => putUpdateMedicine(id, data));

export const useAddMedicineToBrandWithPrice = () =>
  useMutation(({ id, data }) => {
    postAddMedicineToBrandWithPrice(id, data);
  });

export const useEditMedicineToBrandWithPrice = () =>
  useMutation(({ id, data }) => {
    putAddMedicineToBrandWithPrice(id, data);
  });

export const useDeleteMedicineFromBrand = () => {
  const queryClient = useQueryClient();

  return useMutation(({ medicineId, brandId }) => deleteMedicineFromBrand(medicineId, brandId), {
    onSuccess: () => {
      queryClient.invalidateQueries('getListMedicine'); // Cập nhật danh sách thuốc nếu cần
    },
  });
};