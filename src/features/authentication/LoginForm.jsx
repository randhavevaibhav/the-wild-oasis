import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

function LoginForm() {
  const [email, setEmail] = useState("test11@gmail.com");
  const [password, setPassword] = useState("Pass@1234");
  const{login,isLoading} = useLogin();
  const {mode} = useShowHideSidebar();

  function handleSubmit(e) {
    e.preventDefault();
    if(!email||!password) {
      toast.error("Missing Email or Password")
    }else{
      login({email,password},{
        onSettled:()=>{
          setEmail("");
          setPassword("");
        }
      })

    }
    
    

  }

  return (
    <Form onSubmit={handleSubmit} mode={mode}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>{!isLoading?"Log in":<SpinnerMini/>}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
