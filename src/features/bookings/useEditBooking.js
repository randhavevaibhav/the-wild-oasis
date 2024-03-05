import { useQueryClient,useMutation } from "@tanstack/react-query";
import {  createEditBooking} from "../../services/apiBookings";
import {toast} from "react-hot-toast";

export const useEditBooking = ()=>{
    const queryClient = useQueryClient();
    const { mutate:editBooking, isLoading: isEditing } = useMutation({
      mutationFn: ({newBookingData,id})=>createEditBooking(newBookingData,id),
      onSuccess: () => {
        toast.success(" Booking successfully edited !!");
        queryClient.invalidateQueries({
          queryKey: ["edit_booking"],
        });
       
      },
      onError: () => {
        toast.error("Error while editing the booking");
      },
    });

    return {isEditing,editBooking}
}

