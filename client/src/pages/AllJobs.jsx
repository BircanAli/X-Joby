import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { JobsContainer } from "../components";
import SearchContainer from "../components/SearchContainer";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/jobs");

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
