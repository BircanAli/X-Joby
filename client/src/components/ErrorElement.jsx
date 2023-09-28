import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return <h4>There was a error</h4>;
};
export default ErrorElement;
