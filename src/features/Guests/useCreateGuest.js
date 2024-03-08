import { useQueryClient, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { createEditGuest } from "../../services/apiGuests";

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  //console.log(errors);
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createEditGuest,
    onSuccess: () => {
      toast.success("New Guest successfully added !!");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createGuest };
};
