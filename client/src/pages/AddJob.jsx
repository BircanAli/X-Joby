import { FormRow, FormSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch
      .post("/jobs/", data)
      .then((response) => toast(response?.msg));

    return redirect("all-jobs");
  } catch (error) {
    return toast(error?.response?.data?.msg);
  }
};

const AddJob = () => {
  const { user } = useOutletContext();

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
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
