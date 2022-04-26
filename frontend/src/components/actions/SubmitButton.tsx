import Button from "@material-ui/core/Button";
import { UnpackNestedValue, useFormContext } from "react-hook-form";

interface SubmitButtonProps<IFormInputs> {
  formSubmit: (data: IFormInputs) => void;
}

export default function SubmitButton<IFormInputs>(
  props: SubmitButtonProps<IFormInputs>
) {
  const { formSubmit } = props;
  const { handleSubmit } = useFormContext<IFormInputs>();

  function formSubmitHandler(data: UnpackNestedValue<IFormInputs>) {
    formSubmit(data as IFormInputs);
  }

  return (
    <Button onClick={handleSubmit(formSubmitHandler)} color="primary">
      Guardar
    </Button>
  );
}
