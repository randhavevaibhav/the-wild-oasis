import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully !!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: () => toast.error("Error while deleting cabin"),
  });

  return { isDeleting, deleteCabin };
};
