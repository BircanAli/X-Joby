import { FormRow, FormSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, sort, jobStatus, jobType } = searchValues;

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">
          <div className="form-center">
            <FormRow
              type="search"
              name="search"
              defaultValue={search}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormSelect
              labelText="job status"
              name="jobStatus "
              list={["all", ...Object.values(JOB_STATUS)]}
              defaultValue={jobStatus}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormSelect
              labelText="job type"
              name="jobType "
              list={["all", ...Object.values(JOB_TYPE)]}
              defaultValue={jobType}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormSelect
              name="sort"
              defaultValue={sort}
              list={[...Object.values(JOB_SORT_BY)]}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
              Reset Search Values
            </Link>
          </div>
        </h5>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
