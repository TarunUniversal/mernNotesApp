import React,{useState} from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {

  const [show, setShow] = useState(true)

  return (
    <>
    {
      show && <Alert variant={variant} style={{ fontSize: 20,display:'flex', justifyContent:'space-between'  }} >
      <strong>{children}</strong>
      <button type="button" class="btn-close" onClick={() => setShow(false)} data-bs-dismiss={alert}></button>
    </Alert>
    }
    </>
  );
};

export default ErrorMessage;