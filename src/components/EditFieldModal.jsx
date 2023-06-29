/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkpOVEpTV04ya0tkRVZkMElFbEZhIiwiY29tcGFueV9pZCI6ImJmb1Q3MkNWcm9oMlg4ZWZPUmdRIiwidmVyc2lvbiI6MSwiaWF0IjoxNjYxNDE2NzQzNTcxLCJzdWIiOiJQcVJEWDZqMjdXempXRUNsQm92eCJ9.u6WPtyudfB9R4nLnLbBZ6i9KquDeK6WnIOZxKAeE9Hg",
  },
};

const baseUrl = "https://rest.gohighlevel.com/v1";

function EditFieldModal(props) {
  const { contact, customField, setContact } = props;

  const [fieldId, setFieldId] = useState(customField?.id);
  const [open, setOpen] = useState(false);
  const [bookingLink, setBookingLink] = useState("");
  const [updatedContact, setUpdatedContact] = useState(contact);

  useEffect(() => {
    let fieldObj = contact?.customField.find(
      (element) => element.id === fieldId
    );
    if (fieldObj) {
      setBookingLink(fieldObj.value);
    }
  }, []);

  const handleOnchange = (e) => {
    setBookingLink(e.target.value);
    setUpdatedContact({
      ...contact,
      customField: { [fieldId]: e.target.value },
    });
  };

  const handleSubmit = () => {
    axios
      .put(`${baseUrl}/contacts/${contact?.id}`, { ...updatedContact }, config)
      .then((res) => {
        console.log(res.data, contact);
        setContact(res.data.contact);
        console.log(res.status);
        handleOpen();
        toast.success("updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider>
          <div>
            <Input
              label="DFS zoom link"
              value={bookingLink}
              onChange={handleOnchange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            className="mr-1"
            variant="gradient"
            color="green"
            onClick={handleSubmit}
          >
            <span>Confirm</span>
          </Button>
          <Button variant="text" color="red" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default EditFieldModal;
