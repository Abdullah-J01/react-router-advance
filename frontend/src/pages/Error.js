import React from "react";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong";
  if(error.status === 500){
    message = error.data.message;
  }
  if(error.status === 404){
    title = "Error 404";
    message = "Page not found";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
