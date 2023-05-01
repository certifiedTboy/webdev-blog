import React from "react";

const ToasterMessage = ({ message, title, time }) => {
  return (
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        {/* <img src="..." class="rounded me-2" alt="..." /> */}
        <strong class="me-auto">{title}</strong>
        <small>{time}</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{message}</div>
    </div>
  );
};

export default ToasterMessage;