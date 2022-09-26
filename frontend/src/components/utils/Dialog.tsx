import * as React from "react";
import Button from "@material-ui/core/Button";
import MaterialDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UnpackNestedValue, useFormContext } from "react-hook-form";

interface DialogProps<IFormInputs> {
  children: React.ReactElement;
  clickableButtonText: string;
  titleText: string;
  messageText: string;
  formSubmit: (data: IFormInputs) => void;
}

/**
 * Dialog component for forms
 * @returns
 */
export default function Dialog<IFormInputs>(props: DialogProps<IFormInputs>) {
  const { children, clickableButtonText, titleText, messageText, formSubmit } =
    props;
  const [open, setOpen] = React.useState(false);
  const { handleSubmit } = useFormContext<IFormInputs>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function formSubmitHandler(data: UnpackNestedValue<IFormInputs>) {
    formSubmit(data as IFormInputs);
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {clickableButtonText}
      </Button>
      <MaterialDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText>{messageText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit(formSubmitHandler)} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </MaterialDialog>
    </div>
  );
}
