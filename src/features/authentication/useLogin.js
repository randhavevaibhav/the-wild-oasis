import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginAPI } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const useLogin = ()=>{
    const queryClient = useQueryClient();
const navigate = useNavigate();
const {mutate:login,isLoading}=useMutation({
    mutationFn:({email,password})=>loginAPI({
        email,
        password
    }),
    onSuccess:(user)=>{
        
        queryClient.setQueriesData(["user"],user);
       
        navigate("/dashboard")
        console.log(user)
        
    },
    onError:(err)=>{
        console.log("ERROR",err);
        toast.error("Provided email or password is incorrect")
    }
})

return{login,isLoading}
}