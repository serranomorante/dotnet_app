import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select, { SingleValue } from "react-select";

export interface IAddOrderLineFormInputs {
  product: number | null;
  quantity: number;
}

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
  },
});

export const addOrderLineSchema = z.object({
  product: z.number(),
  quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Se esperaba número, se recibió string",
  }),
});

export interface OptionType {
  label: string;
  value: number;
}

interface AddOrderLineFormProps {
  options: OptionType[];
}

/**
 * Update inventory form component
 * @returns
 */
export default function AddOrderLineForm(props: AddOrderLineFormProps) {
  const { options } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<IAddOrderLineFormInputs>();
  const classes = useStyles();

  return (
    <form>
      <Controller
        name="product"
        control={control}
        defaultValue={null}
        render={({ field: { value, onChange, name } }) => (
          <Select
            name={name}
            value={
              Boolean(value)
                ? options.find((option) => option.value === value)
                : null
            }
            onChange={(selectedOption: SingleValue<OptionType>) =>
              onChange((selectedOption as OptionType).value)
            }
            options={options}
          />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <TextField
            {...field}
            label="Cantidad"
            className={classes.field}
            error={Boolean(errors.quantity)}
            type="number"
            helperText={errors.quantity ? errors.quantity?.message : ""}
            fullWidth
          />
        )}
      />
    </form>
  );
}
