import { api } from "@/api/axios";
import { incomeSchema } from "@/components/incomeForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
type CreateIncome = z.infer<typeof incomeSchema>;
type Income = CreateIncome & {
  id: string;
};
const createIncome = async (data: CreateIncome): Promise<Income> =>
  (await api.post<Income>("/income", data)).data;

const getIncome = async () => await api.get("/income");
const getIncomeById = async (id: string) => await api.get(`/income/${id}`);
const updateIncome = async (id: string, data: any) =>
  await api.put(`/income/${id}`, data);
const deleteIncome = async (id: string) => await api.delete(`/income/${id}`);

const USE_INCOME_QUERY_KEY = ["income"] as const;

const useIncome = () => {
  return useQuery({ queryKey: USE_INCOME_QUERY_KEY, queryFn: getIncome });
};
const useIncomeById = (id: string) => {
  return useQuery({
    queryKey: ["incomeById", id],
    queryFn: ({ queryKey }) => getIncomeById(queryKey[1]),
  });
};
const useCreateIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateIncome) =>
      createIncome({
        ...data,
      }),
    onSuccess: (newIncome) => {
      queryClient.setQueryData<Income[] | undefined>(
        USE_INCOME_QUERY_KEY,
        (oldData) => {
          if (Array.isArray(oldData)) {
            return [...oldData, newIncome];
          }
          return [newIncome];
        },
      );
    },
  });
};

export {
  createIncome,
  deleteIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  useIncome,
  useIncomeById,
  useCreateIncome,
};
