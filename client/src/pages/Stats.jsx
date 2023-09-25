import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    toast.success("Success");
    return data;
  } catch (error) {
    toast.error(error);
    return error;
  }
};

const Stats = () => {
  const stats = useLoaderData();
  const { defaultStats, monthlyApplications } = stats;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
