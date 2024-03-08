import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";

import FormRow from "../../ui/FormRow";
import {countryData} from "../../data/data-countries";

import { useShowHideSidebar } from "../../context/showHideSideBarContex";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { Flag } from "../../ui/Flag";
import { useCreateGuest } from "./useCreateGuest";
import Select from "react-select";



const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;






function CreateGuestForm({ guestToEdit = {},onCloseModal }) {
 
  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);
  const {mode} = useShowHideSidebar();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

 
  

 


  const {isCreating,createGuest} = useCreateGuest()

  const { errors } = formState;
  const [countryCode,setCountryCode] = useState("");
  const [country,setCountry] = useState("");
  const [IscountrySelected,setIscountrySelected] = useState(false);

  const onSubmit = (data) => {
   
    data = {...data,nationality:country,countryFlag:`https://flagcdn.com/${countryCode}.svg`}

    createGuest({ ...data }, { onSuccess: () =>{
      reset()
      setIscountrySelected(false)
    }  });

    console.log(data)
  };
  const onError = (errors) => {
    //console.log("errors in form ===> "+errors.description.message);
  };

  const isValidEmail = (email)=> {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Test the email against the regular expression
    return emailRegex.test(email);
  }

  const handleCountryChange = (e)=>{
     
    
    let countryCode = e.target.value;
    let selectedCountry = {};
    if(countryCode!="none")
    {
      setCountryCode(countryCode.toLowerCase());
     setIscountrySelected(true);
     selectedCountry = countryData.find((val)=>val.ISOCode===countryCode);
     
     setCountry(selectedCountry.countryName)
     

    }
    else{
      setIscountrySelected(false);
    }
     
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal?'modal':"regular"} mode={mode}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Please enter your full name",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "Please enter your email",
            validate:(val)=>{
              if(!isValidEmail(val))
              {
                return "Please enter a valid mail."
              }
            }
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="number"
          id="nationalID"
          {...register("nationalID", {
            required: "Please enetr your natinal ID",
            validate:(val)=>{
              if(val<6)
              {
                return "national ID should have atleast 6 digits"
              }
            }
            
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Select nationality" error={errors?.nationality?.message}>
        <StyledSelect
          name="nationality"
          id="nationality"
          disabled={isCreating}
          type="white"
          
         
          {...register("nationality", {
            required: "This field is reuired",
            validate:(value)=>{
              if(value==="none")
              {
                return "Please select Nationality"

              }
              
            }
          })}
          onChange={handleCountryChange}
        >
          <option value="none">Select Nationality</option>
          {countryData.map((country)=><option key={country.ISOCode} value={country.ISOCode}>{country.countryName}</option>)}
        </StyledSelect>
      </FormRow>
     {IscountrySelected? <FormRow label="Country Flag" >
      <Flag src={`https://flagcdn.com/${countryCode}.svg`} alt={`Flag of ${country}`} />
     
        
      </FormRow>:<></>}




      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          disabled={isCreating}
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit Guest" : "Add new Guest"}
        </Button>
      </FormRow>

    
    </Form>
  );
}

export default CreateGuestForm;
