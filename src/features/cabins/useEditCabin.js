import { useQueryClient,useMutation } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabins";
import {toast} from "react-hot-toast";

export const useEditCabin = ()=>{
    const queryClient = useQueryClient();
    const { mutate:editCabin, isLoading: isEditing } = useMutation({
      mutationFn: ({newCabinData,id})=>CreateEditCabin(newCabinData,id),
      onSuccess: () => {
        toast.success(" cabin successfully edited !!");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
       
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

    return {isEditing,editCabin}
}

