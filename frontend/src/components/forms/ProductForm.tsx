import * as Yup from "yup";
import { FormikProps, withFormik, Form } from "formik";
import { IProduct } from "../../@types/IProduct";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

const Schema = Yup.object({
  name: Yup.string().max(255).required("Este campo es requerido"),
});

const useStyles = makeStyles({
  submitButton: {
    marginTop: 20,
  },
});

export interface FormValues {
  name: string;
  description: string;
  price: number;
  isTaxable: boolean;
  isArchived: boolean;
}

interface OtherProps {}

function InnerForm(props: OtherProps & FormikProps<FormValues>) {
  const { values, handleChange, handleBlur } = props;

  const classes = useStyles();

  return (
    <div>
      <Form>
        <TextField
          name="name"
          label="Nombre"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        />
        {/* <Button
          className={classes.submitButton}
          variant="contained"
          type="submit"
          color="primary"
          disableElevation
          fullWidth
        >
          Iniciar sesión
        </Button> */}
      </Form>
    </div>
  );
}

interface ProductFormProps {
  handleSubmit: (values: FormValues) => void;
}

const ProductForm = withFormik<ProductFormProps, FormValues>({
  validationSchema: Schema,
  handleSubmit: async (values, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);

export default ProductForm;
