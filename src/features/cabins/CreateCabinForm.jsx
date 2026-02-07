import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { usePostEditCabin } from "./usePostEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });

  const { mutate, isEditing } = usePostEditCabin({
    onSuccess: () => reset(),
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    mutate({
      newCabinData: {
        ...data,
        image,
      },
      id: editID,
    });
    reset();
  }

  function onError(err) {
    toast.error("there is an error");
    console.log("validation stuff", err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount should be less than the regularPrice",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isEditing}>{isEdit ? "Edit Cabin" : "Create New Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
