import { useQueryClient,useMutation } from "@tanstack/react-query";

import {toast} from "react-hot-toast";
import { CreateEditCabin } from "../../services/apiCabins";

export const useCreateCabin=()=>{
    const queryClient = useQueryClient();
  
//console.log(errors);
const { mutate:createCabin, isLoading: isCreating } = useMutation({
  mutationFn: CreateEditCabin,
  onSuccess: () => {
    toast.success("New cabin successfully created !!");
    queryClient.invalidateQueries({
      queryKey: ["cabins"],
    });
    
  },
  onError: (err) => {
    toast.error(err.message);
  },
});

return{isCreating,createCabin};


}



