import { useQueryClient,useMutation } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import {toast} from "react-hot-toast";

export const useUpdateUser = ()=>{
    const queryClient = useQueryClient();
    const { mutate:updateCurrentUser, isLoading: isUpdating } = useMutation({
      mutationFn: updateCurrentUserAPI,
      onSuccess: ({user}) => {
        toast.success("User successfully updated !!");
        queryClient.setQueryData(["user"],user)
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
       
      },
      onError: () => {
        toast.error("Error while updating user");
      },
    });

    return {isUpdating,updateCurrentUser}
}

