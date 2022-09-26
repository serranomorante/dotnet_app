import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select, { SingleValue } from "react-select";

export interface IUpdateInventoryFormInputs {
  productId: number;
  adjustment: number;
}

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
  },
});

export const updateInventorySchema = z.object({
  productId: z.number().positive({ message: "Id de producto inválida" }),
  adjustment: z
    .string()
    .refine(
      (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
      {
        message: "Por favor ingrese un valor válido",
      }
    ),
});

export interface OptionType {
  label: string;
  value: number;
}

interface UpdateInventoryFormProps {
  options: OptionType[];
}

/**
 * Update inventory form component
 * @returns
 */
export default function UpdateInventoryForm(props: UpdateInventoryFormProps) {
  const { options } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<IUpdateInventoryFormInputs>();
  const classes = useStyles();

  return (
    <form>
      <Controller
        name="productId"
        control={control}
        render={({ field: { value, onChange, name } }) => (
          <Select
            name={name}
            value={options.find((option) => option.value === value)}
            onChange={(selectedOption: SingleValue<OptionType>) =>
              onChange((selectedOption as OptionType).value)
            }
            options={options}
          />
        )}
      />
      <Controller
        name="adjustment"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <TextField
            {...field}
            label="Sumarle al inventario actual"
            className={classes.field}
            error={Boolean(errors.adjustment)}
            type="number"
            helperText={errors.adjustment ? errors.adjustment?.message : ""}
            fullWidth
          />
        )}
      />
    </form>
  );
}
