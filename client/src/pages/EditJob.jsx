import { useActionData, useParams } from "react-router-dom";

export const loader = async () => {
  return null;
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const params = useParams();
  const formData = useActionData();

  return <div>EditJob</div>;
};

export default EditJob;
