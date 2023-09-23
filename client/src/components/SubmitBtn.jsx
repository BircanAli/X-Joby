import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
