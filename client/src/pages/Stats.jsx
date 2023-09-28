import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";
import { useQueries, useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = async () => {
  return null;
};

const Stats = () => {
  // const stats = useLoaderData();
  // const { defaultStats, monthlyApplications } = stats;

  const { isLoading, isError, data } = useQuery(statsQuery);

  if (isLoading) return <h4>loading page</h4>;
  const { defaultStats, monthlyApplications } = data;
  if (isError) return <h4>there is error</h4>;

  return <h1>react query</h1>;
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
