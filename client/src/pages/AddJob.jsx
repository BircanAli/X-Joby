import { FormRow, FormSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
  Outlet,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormSelect
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormSelect
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-block form-btn"
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
