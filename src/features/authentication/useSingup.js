import { useMutation } from "@tanstack/react-query"

import {signup as signupAPI} from "../../services/apiAuth"
import toast from "react-hot-toast";
export const useSignup = ()=>{

const {mutate:signup,isLoading}=useMutation({
    mutationFn:signupAPI,
    onSuccess:(user)=>{
       
        toast.success("Account successfully created. !!\n Please verify the new account from the user's email address.")
    },
    onError:()=>toast.error("Error while creating new user !!")
});

return {signup,isLoading};


}