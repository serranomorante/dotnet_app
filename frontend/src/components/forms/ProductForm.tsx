import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";

export interface IProductFormInputs {
  name: string;
  description: string;
  price: number;
  isTaxable: boolean;
  isArchived: boolean;
}

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
  },
});

export const productFormSchema = z.object({
  name: z
    .string()
    .max(255, { message: "Has alcanzado el máximo permitido" })
    .min(3, { message: "Por favor ingrese un valor mayor a 3 dígitos" }),
  description: z
    .string()
    .max(500, { message: "Has alcanzado el máximo permitido" })
    .min(3, "Por favor ingrese un valor mayor a 3 dígitos"),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Se esperaba número, se recibió string",
  }),
  isTaxable: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

/**
 * Product form component
 * @returns
 */
export default function ProductForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<IProductFormInputs>();
  const classes = useStyles();

  return (
    <form>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            className={classes.field}
            error={Boolean(errors.name)}
            helperText={errors.name ? errors.name?.message : ""}
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Descripción"
            className={classes.field}
            error={Boolean(errors.description)}
            multiline
            helperText={errors.description ? errors.description?.message : ""}
            minRows={2}
            fullWidth
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <TextField
            {...field}
            label="Precio"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            className={classes.field}
            error={Boolean(errors.price)}
            helperText={errors.price ? errors.price?.message : ""}
            type="number"
            fullWidth
          />
        )}
      />
      <FormControl error={Boolean(errors.isTaxable)}>
        <Controller
          name="isTaxable"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  className={classes.field}
                />
              }
              label="Aplicar Impuestos"
            />
          )}
        />
        {errors.isTaxable && (
          <FormHelperText>{errors.isTaxable?.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl error={Boolean(errors.isArchived)}>
        <Controller
          name="isArchived"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  className={classes.field}
                />
              }
              label="Archivado"
            />
          )}
        />
        {errors.isArchived && (
          <FormHelperText>{errors.isArchived?.message}</FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
