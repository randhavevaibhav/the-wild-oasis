import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestAPI } from "../../services/apiGuests";
import { toast } from "react-hot-toast";
export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: (id) => deleteGuestAPI(id),
    onSuccess: () => {
      toast.success("Guest related to given booking deleted successfully !!");
      queryClient.invalidateQueries({
        queryKey:["guests"],
      });
    },

    onError: () => toast.error("Error while deleting guest"),
  });

  return { isDeleting, deleteGuest };
};