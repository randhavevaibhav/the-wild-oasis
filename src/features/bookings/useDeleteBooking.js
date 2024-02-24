import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully !!");
      queryClient.invalidateQueries({
        queryKey:["bookings"],
      });
    },

    onError: () => toast.error("Error while deleting Booking"),
  });

  return { isDeleting, deleteBooking };
};
