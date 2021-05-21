import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
//import { ChakraProvider } from "@chakra-ui/react";
//attach the semantic ui style sheet in react application
ReactDOM.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <App />
    {/* </ChakraProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);


