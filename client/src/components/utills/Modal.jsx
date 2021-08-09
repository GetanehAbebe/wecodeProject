import {
  Modal,
  Button,
  ListGroupItem,
  Image,
  Accordion,
  Card,
  Form,
  Col,
  Row,
} from "react-bootstrap";

import { useState } from "react";


function MyVerticallyCenteredModal(props) {
  const [openEditForm, setOpenEditform] = useState(false);
  const [list, setList] = useState([
    { username: "getaneh" },
    { username: "abebe" },
  ]);

  function edit() {
    setOpenEditform(!openEditForm);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.user.username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          id="modal-img"
          // style={{ margin: "1rem 5rem" }}
          variant="ml-5 text-center"
          src={props.user.src}
          rounded
        />
        <ListGroupItem> שם: {props.user.name}</ListGroupItem>
        <ListGroupItem> זמן הכנה: {props.user.id} דקות</ListGroupItem>
        <ListGroupItem
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {" "}
          מצרכים {props.user.grade}
        </ListGroupItem>
        <ListGroupItem
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {" "}
          אופן ההכנה {props.user.grade}
        </ListGroupItem>

        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            1:{props.user.name}
            2:{props.user.name}
            3:{props.user.name}
            4:{props.user.name}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>חזור</Button>
        <Button onClick={() => edit()}>ערוך</Button>
        <Button className="btn btn-success" >
          {" "}
          הוסף מצרכים לעגלה
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
