import Button from "@material-ui/core/Button";

interface CreateUpdateActionsProps {
  handleCreate: () => void;
  handleEdit: () => void;
}

export default function CreateUpdateActions(
  props: CreateUpdateActionsProps
): JSX.Element {
  const { handleCreate, handleEdit } = props;

  return (
    <div>
      <Button onClick={handleCreate}>Crear</Button>
      <Button onClick={handleEdit}>Editar</Button>
    </div>
  );
}
