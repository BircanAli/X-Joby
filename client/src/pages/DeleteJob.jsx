import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    const { id } = params;
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job has deleted");
    return redirect("../all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("../all-jobs");
  }
};
