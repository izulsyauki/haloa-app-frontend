import { useRouteError } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";

interface RouterError {
    statusText? : string;
    message? : string;
}

export function ErrorPageRoute() {
  const error = useRouteError() as RouterError;
  console.error(error);

  return <ErrorPage />; 
}