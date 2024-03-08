import { useQueryClient, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  //console.log(errors);
  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      toast.success("New Booking successfully created !!");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createBooking };
};
