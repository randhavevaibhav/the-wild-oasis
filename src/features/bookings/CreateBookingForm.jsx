import { useForm, Controller } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import FormRow from "../../ui/FormRow";

import { useCreateBooking } from "./useCreateBooking";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";
import { useEditBooking } from "./useEditBooking";

import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DatePickerItemsWrapper from "../../ui/DatePickerItemsWrapper";
import { formatCurrency } from "../../utils/helpers";
import { compareAsc, differenceInDays, format } from "date-fns";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "../Guests/useGuests";
import { useSettings } from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import { useGetAllBookings } from "./useGetAllBookings";
import toast from "react-hot-toast";
import { useGuestsWithNoBooking } from "../Guests/useGuestsWithNoBooking";
import FormRowVertical from "../../ui/FormRowVertical";



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

const StyledDatePickerWrapper = styled.div`
  display: grid;

  grid-template-columns: 24rem 1fr 19rem;
  gap: 2.4rem;
  align-items: center;
  ${(props) =>
    props.mode === "mobile" &&
    css`
      align-items: flex-start;

      grid-template-columns: 1fr;
    `}
`;

const StyledLabel = styled.label`
  color: white;
  font-weight: 600;
`;
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
`;

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();
  const { cabins, isLoading: isCabinLoading } = useCabins();
  //const { guests, isLoading: isGuestsLoading } = useGuests();
  
  const {bookings,isLoading:isBookingLoading} = useGetAllBookings();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const {guests:guestsWithNoBooking, isLoading:isGuestsLoading2} = useGuestsWithNoBooking();

  const [addBreakFast, setAddBreakFast] = useState(false);
  const [filteredBookings,setFilteredBookings] = useState([]);
const [isCabinSelected,setIsCabinSelected]  =useState(false);
const [numGuestsState,setnumGuestsState] = useState(0);
const [isAmountPaid,setIsAmountPaid] = useState(false);
  

  const isWorking =
    isCreating ||
    isEditing ||
    isCabinLoading ||
    // isGuestsLoading ||
    isSettingsLoading ||
    isBookingLoading||
    isGuestsLoading2;

  const { mode } = useShowHideSidebar();

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  

  let maxBookingNight = 0;
  let maxGuests = 0;
  let optionalBreakfastPrice = 0;
  
 
  const {
    register,
    setError,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    clearErrors,
    formState,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors: formErrors } = formState;
  
 
  const calculateBreakFastPrice = ()=>{
    
    const {breakfastPrice} = settings;
    

    if(getValues().numNights&&getValues().numGuests)
    {
      optionalBreakfastPrice =
    parseInt(breakfastPrice) * parseInt(getValues().numNights) * parseInt(getValues().numGuests);

    }else{
      optionalBreakfastPrice=0;
    }
    
   
  }

  const clearBreakFastCheckAndResetTotalAmt = ()=>{
    setAddBreakFast(false);
    handleTotalPrice();
  }


  const handleTotalPrice = useCallback( ()=>{
    
    //console.log("addBreakFast === >"+addBreakFast)
    let totalBookingPrice = getValues().cabinPrice;
    if(getValues().numNights&&getValues().numGuests)
    {
      if(addBreakFast)
      {
        totalBookingPrice = getValues().cabinPrice+optionalBreakfastPrice;

      }
      else{
        totalBookingPrice = getValues().cabinPrice;
      }
     
    }
   //alert(totalPrice)
   setValue("totalPrice",totalBookingPrice)

  }, [addBreakFast,optionalBreakfastPrice,setValue,getValues]);
  
  

  if (!isWorking) {
    const { maxBookingLength, maxGuestsPerBooking} = settings;
    
    
    maxBookingNight = maxBookingLength;
    maxGuests = maxGuestsPerBooking;
    
    calculateBreakFastPrice();
   
    
  }

const checkIfCabinAvailable = ()=>{
   //console.log("from value ====> "+getValues().startDate);
let isCabinUnavailale = false;
  if(getValues().endDate && getValues().startDate)
  {
    // console.log("filetered Bookings ===> "+JSON.stringify(filteredBookings))
    
    filteredBookings.map((booking,id)=>{
       //console.log("booking.endDate ====> "+id+" "+booking.endDate+" comp value ===> "+compareAsc(new Date(getValues().startDate),new Date(booking.endDate)));

     if(compareAsc(new Date(getValues().startDate),new Date(booking.endDate)) ===-1) 
     {
      

      isCabinUnavailale=true;
      setValue("startDate","");
      setValue("endDate","");
      toast.error(`Please select from date greater than\n
      ${format(new Date(booking.endDate), 'dd/MM/yyyy')}
      \nCabin is already booked for those days !!!`)

     }


    })

    
  }

  console.log("isCabinUnavailale ====> "+isCabinUnavailale);

}



  const validateDates = () => {
    let valdFlag = true;
    let datediff = differenceInDays(
      new Date(getValues().endDate),
      new Date(getValues().startDate)
    );
    //alert(getValues().startDate)

    if (getValues().startDate < new Date()) {
      setError("startDate", {
        message: "from date should be greater than todays date",
      });
      valdFlag = false;
      return;
    }
    if (getValues().startDate > getValues().endDate) {
      setError("endDate", {
        message: "To date should be greater than From date",
      });
      valdFlag = false;
      return;
    }
    if (datediff < 1 || isNaN(datediff)) {
      if (
        (getValues().startDate === undefined &&
          getValues().endDate === undefined) ||
        (datediff === 0 &&
          getValues().startDate === null &&
          getValues().endDate === null)
      ) {
        setError("startDate", { message: "Please select a date" });
        setError("endDate", { message: "Please select a date" });
        valdFlag = false;
        return;
      } else if (datediff <= 1) {
        setError("startDate", {
          message: "stay duration should be greater than or equal to  1 day",
        });
        setError("endDate", {
          message: "stay duration should be greater than or equal to  1 day",
        });
        valdFlag = false;
        return;
      }
    }
    if (datediff >= 120) {
      setError("startDate", {
        message: "stay duration should be less than 4 months",
      });
      setError("endDate", {
        message: "stay duration should be less than 4 months",
      });
      valdFlag = false;
      return;
    }

    if (valdFlag) {
      checkIfCabinAvailable();
      clearErrors(["startDate", "endDate"]);
    }
    return valdFlag;
  };



  const calculateNoOfNights = () => {
    let diffInDays = differenceInDays(
      new Date(getValues().endDate),
      new Date(getValues().startDate)
    );
    if (!getValues().startDate || !getValues().endDate || diffInDays <= 0) {
      // alert("no start or end")

      //setNoOfnights(0);
      setValue("numNights", 0);
    } else {
      //setNoOfnights(diffInDays)
      setValue("numNights", diffInDays);
      if (diffInDays > maxBookingNight) {
        clearErrors(["numNights"]);
      }
      if (diffInDays < maxBookingNight) {
        setError("numNights", {
          message: `minimum booking nights should be greater than ${maxBookingNight}`,
        });
      }
    }
  };

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
      if (!validateDates()) {
        //console.log("came out of validateDates fun")
        return;
      }

      //  const filtercabin = cabins.find((cabin)=>cabin.id===62);
      //  console.log("filtercabin =====> " + JSON.stringify(filtercabin));
      data = {...data,"extrasPrice":addBreakFast? optionalBreakfastPrice:0,"hasBreakfast":addBreakFast,"isPaid":isAmountPaid}
      console.log("form data =====> " + JSON.stringify(data));
       createBooking({ ...data }, { onSuccess: () => reset() });
    }

    //console.log(data)
  };

  const handleCabinChange = (e) => {
    //console.log("e "+e.target.value);
    let selectedCabin = parseInt(e.target.value);
    
    if (isNaN(selectedCabin)) {
      //means "select option"
      //setCabinPrice(0);
      
      setValue("startDate","");
      setValue("endDate","");
      setValue("cabinPrice", 0);
      setValue("numNights", 0);
      setValue("totalPrice", 0);
      setAddBreakFast(false);
      setIsCabinSelected(false);

    } else {
        const filterCabin = cabins?.find(
        (cabin) => cabin.id === parseInt(e.target.value)
      );
      
      const filterBookings = bookings.filter((val)=>{
        
          return val.cabinId===filterCabin.id;
      })

      setFilteredBookings(filterBookings);

      //console.log(filterBookings);



      setValue("cabinPrice", filterCabin.regularPrice);
      handleTotalPrice();
      
     
      if(!(toString(selectedCabin)==="Select a cabin"))
      {
       
        clearErrors(["cabinId"]);
        setIsCabinSelected(true);
      }
     
      if(getValues().cabinPrice>100)
      {
        clearErrors(["cabinPrice","totalPrice"]);
      }
      //console.log("cabinPrice ====> "+cabinPrice);
    }
  };

 useEffect(()=>{
  handleTotalPrice();
  

 },[handleTotalPrice])

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      mode={mode}
    >
      <FormRow label="Select cabin" error={formErrors?.cabinId?.message}>
        <StyledSelect
          name="cabinId"
          id="cabinId"
          
          disabled={isWorking}
          {...register("cabinId", {
            required: "This field is reuired",
            validate: (value) => {
              if (value === "none") {
                return "Please select a cabin.";
              }
            },
          })}
          onChange={handleCabinChange}
        >
          <option value="none">Select a cabin</option>
          {cabins &&
          
            cabins.map((cabin) => (
              <option key={cabin.name} value={cabin.id}>
                {cabin.name}
              </option>
            ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Cabin price" error={formErrors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          value={getValues.cabinPrice}
          {...register("cabinPrice", {
            validate: (value) => {
              if (value === undefined || value < 100) {
                return "Cabin price should be greater than 100";
              }
            },
          })}
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
                disabled={!isCabinSelected}
                onChange={onChange}
                onBlur={() => {
                  validateDates();
                  calculateNoOfNights();
                }}
                placeholderText="Choose a start date"
              />
            )}
          />
          {formErrors.startDate && (
            <p style={{ color: "red" }}>{formErrors.startDate.message}</p>
          )}
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
                disabled={!isCabinSelected}
                onChange={onChange}
                onBlur={() => {
                  validateDates();
                  calculateNoOfNights();
                }}
                placeholderText="Choose a end date"
              />
            )}
          />
          {formErrors.endDate && (
            <p style={{ color: "red" }}>{formErrors.endDate.message}</p>
          )}
        </StyledDatePickerWrapper>
      </DatePickerItemsWrapper>

      <FormRow label="No. of Nights" error={formErrors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          value={getValues().numNights}
          disabled={true}
          {...register("numNights", {
            required: "This field is reuired",
            validate: (value) => {
              if (value < maxBookingNight) {
                return `minimum booking nights are greater than ${maxBookingNight}`;
              }
            },
          })}
        />
      </FormRow>

      <FormRow label="No. of Guests" error={formErrors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
         
          {...register("numGuests", {
            required: "This field is reuired",
            validate: (value) => {
              if (value > maxGuests) {
                return `max guests per cabin are limited to ${maxGuests}`;
              }
              if (value<2) {
                return `min guests atleast greater than 2`;
              }
            },
            onBlur:()=>{
              handleTotalPrice();
            
              

            },
            onChange:(e)=>{
              setnumGuestsState(e.target.value);
              //  alert("hi ==> "+e.target.value)
              clearBreakFastCheckAndResetTotalAmt();
              //calculateBreakFastPrice();
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
            validate:(value)=>{
              if(value==="Select a guest")
              {
                return "Please select a guest"

              }
              
            }
          })}
        >
          <option value="Select a guest">Select a guest</option>
          {guestsWithNoBooking &&
            guestsWithNoBooking.map((guest) => (
              <option key={guest.name} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="status" error={formErrors?.status?.message}>
        <StyledSelect
          name="status"
          id="status"
          disabled={isWorking}
          {...register("status", {
            required: "This field is reuired",
            validate:(value)=>{
              if(value==="Select a status") 
              {
                return "Please select status"
              }
            }
          })}
        >
          <option value="Select a status">Select status</option>
          <option value="unconfirmed">unconfirmed</option>
          <option value="checked in">checked in</option>
          <option value="checked out">checked out</option>
        </StyledSelect>
      </FormRow>


     {<>
     
      {numGuestsState&&getValues().numNights&&numGuestsState >=2&& numGuestsState <=maxGuests&&
      <FormRow>
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
             
              setAddBreakFast((add) => !add);
              
              
              
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      </FormRow>||<></>}


       <FormRow label="Total amount" error={formErrors?.totalPrice?.message}>
       <Input
         type="number"
         id="totalPrice"
         value={getValues().totalPrice}
         {...register("totalPrice", {
           required: "This field is reuired",
           min: {
             value: 1,
             message: "ammount should be atleast greater than 1",
           },
         })}
         disabled={true}
       />
       
     </FormRow>
    
     <FormRow>
     <Box>
          <Checkbox
            checked={isAmountPaid}
            onChange={() => {
             
              setIsAmountPaid((paid) => !paid);
              
              
              
            }}
            id="isAmountPaid"
          >
            Is amount Paid?
          </Checkbox>
        </Box>
     </FormRow>
     </> 
   
      
      }
     

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
      {/* {!isWorking&&console.log("guestsWithNoBooking ===> length \n"+guestsWithNoBooking.length+"\n"+" ---} "+JSON.stringify(guestsWithNoBooking))} */}
    </Form>
  );
}

export default CreateBookingForm;
