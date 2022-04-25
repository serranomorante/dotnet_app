import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SimpleModal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface ModalProps {
  children: React.ReactElement;
}

export default function Modal(props: ModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { children } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <SimpleModal open={open} onClose={handleClose}>
        <div className={classes.paper}>{children}</div>
      </SimpleModal>
    </div>
  );
}
