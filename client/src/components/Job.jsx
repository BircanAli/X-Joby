import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import JobInfo from "./JobInfo";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const Job = ({
  _id,
  company,
  jobStatus,
  jobLocation,
  jobType,
  createdAt,
  position,
}) => {
  const date = dayjs(createdAt).format("MMM Do ,YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`../edit-jobs/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="POST" action={`../delete-job/${_id}`}>
            <button className="btn delete-btn" type="submit">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
