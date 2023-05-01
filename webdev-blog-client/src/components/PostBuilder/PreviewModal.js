import React, { Fragment } from "react";
import ProfileModal from "../User/GeneralProfile/Modals/ProfileModal";
import { Modal } from "react-bootstrap";
import { Interweave } from "interweave";
import { transform } from "../Blogs/SingleBlog/Transform";
import "./PostBuilder.css";

const PreviewModal = ({ title, content, onShowModal }) => {
  return (
    <ProfileModal>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <Fragment>
              <Interweave content={content} transform={transform} />
            </Fragment>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn-warning" onClick={onShowModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </ProfileModal>
  );
};

export default PreviewModal;
