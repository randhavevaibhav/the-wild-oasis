import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { CreateEditCabin } from "../../services/apiCabins";



function CreateCabinForm({cabinToEdit={}}) {
  const{id:editId,...editValues} = cabinToEdit;
const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession?editValues:{}
  });
  const queryClient = useQueryClient();
  const { errors } = formState;
  //console.log(errors);
  const { mutate:createCabin, isLoading: isCreating } = useMutation({
    mutationFn: CreateEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created !!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });


  const { mutate:editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData,id})=>CreateEditCabin(newCabinData,id),
    onSuccess: () => {
      toast.success(" cabin successfully edited !!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image==="string" ?data.image:data.image[0];


    if(isEditSession)
    {
      editCabin({newCabinData:{ ...data, image: image},id:editId});
    }
    else{
      createCabin({ ...data, image: image});

    }
    
    //console.log(data)
  };
  const onError = (errors) => {
    //console.log("errors in form ===> "+errors.description.message);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is reuired",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is reuired",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is reuired",
            min: {
              value: 1,
              message: "Regular Price should be atleast greater than 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is reuired",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is reuired",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession?false:"This field is reuired",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession?"Edit cabin":"Add new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
