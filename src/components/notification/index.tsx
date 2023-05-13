import React, { useState } from "react";
import "./index.css";

interface Props{
  notice: Notice;
  onClose: () => void;
}

export interface Notice {
  type: "normal" | "error";
  message: string;
}

const Notification: React.FC<Props> = ({notice, onClose}) => {
  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => {
    setShow(false);
    onClose()
  };

  return (
    <div className={`notice ${notice.type} ${show ? "show" : "hide"}`}>
      <p>{notice.message}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Notification;
