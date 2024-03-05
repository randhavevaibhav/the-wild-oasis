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
  display: flex;
  gap: 1rem;
  align-items: center;
  ${(props) =>
    props.mode === "mobile" &&
    css`
    align-items: flex-start;
    flex-direction: column;

     
    `}
`;

const StyledLabel=styled.label`
     color: white;
     font-weight: 600;
`;




function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();

  const isWorking = isCreating || isEditing;
  const { mode } = useShowHideSidebar();

  const [startDate, setStartDate] = useState(new Date());

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const [statusValue, setStatusValue] = useState("unconfirmed");
 
  const statusOptions = [
    { value: "unconfirmed", label: "unconfirmed" },
    { value: "checked_in", label: "checked in" },
    { value: "checked_out", label: "checked out" },
  ];

  const { register,setError, handleSubmit, control, reset, getValues, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  const validateDates = ()=>{
    let valdFlag = true;
    let datediff = differenceInDays(new Date(getValues().todate),new Date(getValues().fromdate));
    //alert(datediff)
      if(getValues().fromdate >getValues().todate)
      {
        setError("fromdate",  {message: 'from date should be less than to date'});
        valdFlag=false;
        return valdFlag;
        

      }
      if(datediff<1||isNaN(datediff))
      {
        if((getValues().fromdate===undefined&&getValues().todate===undefined) || (datediff===0 &&getValues().fromdate===null&&getValues().todate===null))
        {
          setError("fromdate",  {message: 'Please select a date'});
          setError("todate",  {message: 'Please select a date'});
          valdFlag=false;
        return valdFlag;

        }
        else{
          setError("fromdate",  {message: 'stay duration should be greater than or equal to  1 day'});
        setError("todate",  {message: 'stay duration should be greater than or equal to  1 day'});
        valdFlag=false;
        return valdFlag;
        }
       

      }
      if(datediff>=120)
      {
        setError("fromdate",  {message: 'stay duration should be less than 4 months'});
        setError("todate",  {message: 'stay duration should be less than 4 months'});
        valdFlag=false;
        return valdFlag;

      }
      return valdFlag;
     
  }

  const onSubmit = (data) => {
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
      
     if(!validateDates()) return;


      console.log("form data =====> " + JSON.stringify(data));
      //createBooking({ ...data }, { onSuccess: () => reset() });
    }

    //console.log(data)
  };
  



  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      mode={mode}
    >
      <FormRow label="Booking name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is reuired",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Guest name" error={errors?.guest_name?.message}>
        <Input
          type="text"
          id="guest_name"
          {...register("guest_name", {
            required: "This field is reuired",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <DatePickerItemsWrapper mode={mode}>
       
        <StyledDatePickerWrapper mode={mode}>
          <StyledLabel>From :</StyledLabel>
          <Controller
            name={"fromdate"}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                toggleCalendarOnIconClick
                showIcon
                selected={value}
                onChange={onChange}
                placeholderText="Choose a start date"
              />
            )}
          />
           {errors.fromdate && <p style={{color:"red"}}>{errors.fromdate.message}</p>}
        </StyledDatePickerWrapper>
        <StyledDatePickerWrapper mode={mode}>
        <StyledLabel>To :</StyledLabel>
          <Controller
            name={"todate"}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                toggleCalendarOnIconClick
                showIcon
                selected={value}
                onChange={onChange}
                placeholderText="Choose a end date"
              />
            )}
          />
          {errors.todate && <p style={{color:"red"}}>{errors.todate.message}</p>}
        </StyledDatePickerWrapper>
      </DatePickerItemsWrapper>

      <FormRow label="status" error={errors?.status?.message}>
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

      <FormRow label="ammount" error={errors?.ammount?.message}>
        <Input
          type="number"
          id="ammount"
          {...register("ammount", {
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
