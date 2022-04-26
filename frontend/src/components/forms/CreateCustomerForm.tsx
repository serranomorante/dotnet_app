import * as z from "zod";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { ICustomer, ICustomerAddress } from "../../@types/ICustomer";

export interface ICreateCustomerFormInputs {
  firstName: string;
  lastName: string;
  primaryAddress: ICustomerAddress;
}

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
  },
});

export const createCustomerFormSchema = z.object({
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  primaryAddress: z.object({
    addressLine1: z.string().max(255),
    addressLine2: z.string().max(255),
    city: z.string().max(127),
    state: z.string().max(127),
    postalCode: z.string().max(127),
    country: z.string().max(127),
  }),
});

/**
 * Product form component
 * @returns
 */
export default function CreateCustomerForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ICreateCustomerFormInputs>();
  const classes = useStyles();

  return (
    <form>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            className={classes.field}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName ? errors.firstName?.message : ""}
            fullWidth
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Apellidos"
            className={classes.field}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName ? errors.lastName?.message : ""}
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.addressLine1"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Dirección 1"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.addressLine1)}
            helperText={
              errors.primaryAddress?.addressLine1
                ? errors.primaryAddress.addressLine1?.message
                : ""
            }
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.addressLine2"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Dirección 2"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.addressLine2)}
            helperText={
              errors.primaryAddress?.addressLine2
                ? errors.primaryAddress.addressLine2?.message
                : ""
            }
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.city"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Ciudad"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.city)}
            helperText={
              errors.primaryAddress?.city
                ? errors.primaryAddress.city?.message
                : ""
            }
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.state"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Estado"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.state)}
            helperText={
              errors.primaryAddress?.state
                ? errors.primaryAddress.state?.message
                : ""
            }
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.postalCode"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Código Postal"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.postalCode)}
            helperText={
              errors.primaryAddress?.postalCode
                ? errors.primaryAddress.postalCode?.message
                : ""
            }
            fullWidth
          />
        )}
      />
      <Controller
        name="primaryAddress.country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="País"
            className={classes.field}
            error={Boolean(errors.primaryAddress?.country)}
            helperText={
              errors.primaryAddress?.country
                ? errors.primaryAddress.country?.message
                : ""
            }
            fullWidth
          />
        )}
      />
    </form>
  );
}
