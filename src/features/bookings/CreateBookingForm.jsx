import { useForm, useController, Controller } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateBooking } from "./useCreateBooking";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";
import { useEditBooking } from "./useEditBooking";
import Select from "../../ui/Select";
import { useState } from "react";
import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import FormRowVertical from "../../ui/FormRowVertical";
import DatePickerWrapper from "../../ui/DatePickerItemsWrapper";
import DatePickerItemsWrapper from "../../ui/DatePickerItemsWrapper";
import { subtractDates } from "../../utils/helpers";
import { differenceInDays } from "date-fns";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "./useGuests";
import { useSettings } from "../settings/useSettings";

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

const StyledDatePickerWrapper=styled.div`
  display: grid;
 
  grid-template-columns: 24rem 1fr 19rem; 
  gap:2.4rem;
  align-items: center;
  ${(props) =>
    props.mode === "mobile" &&
    css`
    align-items: flex-start;
    
    grid-template-columns: 1fr;

     
    `}
`;

const StyledLabel=styled.label`
     color: white;
     font-weight: 600;
`;




function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();
  const {cabins, isLoading:isCabinLoading} =useCabins();
  const{guests,isLoading:isGuestsLoading} = useGuests();
  const {settings,isLoading:isSettingsLoading} = useSettings();

  

  const isWorking = isCreating || isEditing ||isCabinLoading||isGuestsLoading||isSettingsLoading;
  
  const { mode } = useShowHideSidebar();

  
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  let maxBookingNight = 0;
  let maxGuests = 0;
  if(!isWorking)
    {
      const {maxBookingLength,maxGuestsPerBooking} = settings;
      maxBookingNight=maxBookingLength;
      maxGuests=maxGuestsPerBooking;
    }
  
 

  const { register,setError, handleSubmit, control, reset, getValues,setValue,clearErrors, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors:formErrors } = formState;

  const validateDates = ()=>{
    let valdFlag = true;
    let datediff = differenceInDays(new Date(getValues().endDate),new Date(getValues().startDate));
    //alert(getValues().startDate)

    if(getValues().startDate <new Date())
      {
        setError("startDate",  {message: 'from date should be greater than todays date'});
        valdFlag=false;
        return;
        
        

      }
      if(getValues().startDate >getValues().endDate)
      {
        setError("endDate",  {message: 'To date should be greater than From date'});
        valdFlag=false;
        return;
        
        

      }
      if(datediff<1||isNaN(datediff))
      {
        if((getValues().startDate===undefined&&getValues().endDate===undefined) || (datediff===0 &&(getValues().startDate===null&&getValues().endDate===null)))
        {
          setError("startDate",  {message: 'Please select a date'});
          setError("endDate",  {message: 'Please select a date'});
          valdFlag=false;
          return
       

        }
        else if(datediff<=1){
          setError("startDate",  {message: 'stay duration should be greater than or equal to  1 day'});
        setError("endDate",  {message: 'stay duration should be greater than or equal to  1 day'});
        valdFlag=false;
        return;
        
        }
       

      }
      if(datediff>=120)
      {
        setError("startDate",  {message: 'stay duration should be less than 4 months'});
        setError("endDate",  {message: 'stay duration should be less than 4 months'});
        valdFlag=false;
        return;
        

      }

      if(valdFlag)
      {
        clearErrors(["startDate","endDate"]);
      }
      return valdFlag;
     
  }
  const calculateNoOfNights = ()=>{
    let diffInDays = differenceInDays(new Date(getValues().endDate),new Date(getValues().startDate ));
    if(!getValues().startDate|| !getValues().endDate || diffInDays<=0)
    {
      // alert("no start or end")
      
      //setNoOfnights(0);
      setValue("numNights", 0)
    }else{
     
       //setNoOfnights(diffInDays)
       setValue("numNights", diffInDays)
    }
  }


  const onSubmit = (data) => {
    //alert("hi")
    //clearErrors();
    if (isEditSession) {
      // editBooking(
      //   { newBookingData: { ...data }, id: editId },
      //   {
      //     onSuccess: () => {
      //       reset();
      //       onCloseModal?.();
      //     },
      //   }
      // );
    } else {
     
     if(!validateDates()) {
      //console.log("came out of validateDates fun")
      return;
     }
     
   
     
    //  const filtercabin = cabins.find((cabin)=>cabin.id===62);
    //  console.log("filtercabin =====> " + JSON.stringify(filtercabin));
      console.log("form data =====> " + JSON.stringify(data));
     // createBooking({ ...data }, { onSuccess: () => reset() });
    }

    //console.log(data)
  };
  const handleCabinChange = (e)=>{
   //console.log("e "+e.target.value);
      let selectedCabin  = parseInt(e.target.value);
      if(isNaN(selectedCabin)) //means "select option"
      {
        //setCabinPrice(0);
        setValue("cabinPrice", 0)

      }else{

        const filterCabin = cabins?.find((cabin)=>cabin.id===parseInt(e.target.value));
        
        setValue("cabinPrice", filterCabin.regularPrice)
        //console.log("cabinPrice ====> "+cabinPrice);
      }
     
     

   
   

  }



  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      mode={mode}
    >
     
      <FormRow label=" Select cabin" error={formErrors?.cabinId?.message}>
        <StyledSelect
          name="cabinId"
          id="cabinId"
          disabled={isWorking}
          {...register("cabinId", {
            required: "This field is reuired",
            validate: (value) =>{
              if(value==="Select a cabin")
              {
                return "Please select a cabin."
              }

            }
          })}
          onChange={handleCabinChange}
        >
          <option value="Select a cabin">Select a cabin</option>
          {cabins && cabins.map((cabin)=><option key={cabin.name} value={cabin.id}>{cabin.name}</option>)}
          
        </StyledSelect>
      </FormRow>

      <FormRow label="Cabin price" error={formErrors?.cabinPrice?.message}>
        <Input
          type="cabinPrice"
          id="cabinPrice"
          value={getValues.cabinPrice}
          {...register("cabinPrice",{validate: (value) =>{
              if(value===undefined || value<100)
              {
                return "Cabin price should be greater than 100";
              }
          },})}
          disabled={true}
         

          
        />
      </FormRow>

      <DatePickerItemsWrapper mode={mode}>
       
        <StyledDatePickerWrapper mode={mode}>
          <StyledLabel>From :</StyledLabel>
          <Controller
            name={"startDate"}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                toggleCalendarOnIconClick
                showIcon
                
                selected={value}
                onChange={
                 onChange
                }
               onBlur={()=>{
               validateDates()
               calculateNoOfNights()
               }}
                placeholderText="Choose a start date"
              />
            )}
          />
           {formErrors.startDate && <p style={{color:"red"}}>{formErrors.startDate.message}</p>}
        </StyledDatePickerWrapper>
        <StyledDatePickerWrapper mode={mode}>
        <StyledLabel>To :</StyledLabel>
          <Controller
            name={"endDate"}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                toggleCalendarOnIconClick
                showIcon
                selected={value}
                onChange={onChange}
                onBlur={()=>{
                  validateDates()
                  calculateNoOfNights()
                  }}
                placeholderText="Choose a end date"
              />
            )}
          />
          {formErrors.endDate && <p style={{color:"red"}}>{formErrors.endDate.message}</p>}
        </StyledDatePickerWrapper>
      </DatePickerItemsWrapper>

      <FormRow label="No. of Nights" error={formErrors?.numNights?.message}>
        <Input
          type="numNights"
          id="numNights"
          value={getValues().numNights}
          disabled={true}
          {...register("numNights", {
            required: "This field is reuired",
            validate: (value) =>{
              if(value<maxBookingNight)
              {
                return `no of nights should be greater than ${maxBookingNight}`;
              }
          }
          })}
         
        />
      </FormRow>

      <FormRow label="No. of Guests" error={formErrors?.numGuests?.message}>
        <Input
          type="numGuests"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is reuired",
            validate:(value)=>{
                if(value>maxGuests){
                  return `max guests per cabin are limited to ${maxGuests}`
                }
            }
          })}
          disabled={isWorking}
        />
      </FormRow>
 

      <FormRow label="Select Guest" error={formErrors?.guestId?.message}>
         <StyledSelect
          name="guestId"
          id="guestId"
          disabled={isWorking}
          {...register("guestId", {
            required: "This field is reuired",
          })}
        >
          {guests && guests.map((guest)=><option key={guest.name} value={guest.id}>{guest.fullName}</option>)}
         
          
        </StyledSelect>
      </FormRow>

      <FormRow label="status" error={formErrors?.status?.message}>
        <StyledSelect
          name="status"
          id="status"
          disabled={isWorking}
          {...register("status", {
            required: "This field is reuired",
          })}
        >
          <option value="unconfirmed">unconfirmed</option>
          <option value="checked in">checked in</option>
          <option value="checked out">checked out</option>
        </StyledSelect>
      </FormRow>

      <FormRow label="amount" error={formErrors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          {...register("totalPrice", {
            required: "This field is reuired",
            min: {
              value: 1,
              message: "ammount should be atleast greater than 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit booking" : "Add new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
