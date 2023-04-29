import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProfileModal from "./ProfileModal";
import { requestFailed } from "../../../../lib/generaRequestRedux/requestSlice";
import { uploadUserImage } from "../../../../lib/generaRequestRedux/requestActions";
import MiniLoader from "../../../UI/Loader/MiniLoader";
import classes from "./ProfileModal.module.css";

const ProfileUpload = ({ onShowModal }) => {
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, error } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const onSelectFile = (event) => {
    const onLoadFn = (dataURL) => {
      const type = atob(btoa(dataURL)).split(":")[1].split(";")[0];
      if (
        type !== "image/png" &&
        type !== "image/jpg" &&
        type !== "image/jpeg"
      ) {
        setPrevImage("");
        return dispatch(requestFailed({ error: "Invalid image format" }));
      }

      setErrorMessage("");
      setPrevImage(dataURL);
    };

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => onLoadFn(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };

  const onUploadUserImage = async (event) => {
    event.preventDefault();
    if (!image || image.length === 0) {
      return dispatch(requestFailed({ error: "Select image" }));
    }

    if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    ) {
      return dispatch(requestFailed({ error: "invalid image format" }));
    }

    dispatch(uploadUserImage(image));
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.error);
    }
  }, [error]);

  return (
    <ProfileModal>
      <Modal.Header>
        <Modal.Title>
          <strong> Upload Image </strong>
        </Modal.Title>
      </Modal.Header>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {prevImage && (
        <div className="text-center">
          <img
            src={prevImage}
            className={classes.prevImage}
            alt="preview_image"
          />
        </div>
      )}

      {isLoading && <MiniLoader />}

      <Modal.Body>
        <div className="form-group">
          <input type="file" className="form-control" onInput={onSelectFile} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onShowModal}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={onUploadUserImage}
          className={`${errorMessage ? "disabled" : ""}`}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </ProfileModal>
  );
};

export default ProfileUpload;
