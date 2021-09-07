import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pages.css";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { deleteNoteAction, listNotes } from "../../actions/notes";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import NotFound from "./NotFound";
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

const MyNotes = ({ search }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const [modal, setModal] = useState();
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  const handleDelete = (id) => {
    dispatch(deleteNoteAction(id));
    handleClose();
  };

  useEffect(() => {
    if (!userInfo) history.push("/");
    dispatch(listNotes());
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch]);

  const handlemodal = (data) => {
    setShow(!show);
    setModal(data);
  };

  return (
    <>
      <h1 className="heading">My Notes</h1>
      <div style={{marginBottom:"4%"}}>
        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        { notes ? notes.length === 0 ? <NotFound/> : notes
          ?.filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <>
              <div>
                <Accordion key={note._id}>
                  <Card className="mynotes" style={{ margin: "10px 55px" }}>
                    <Card.Header as="h5" style={{ float: "right" }}>
                      {" "}
                      <Accordion.Toggle eventKey="0" as={Card.Text}>
                        {note.title}
                        <spam
                          style={{ float: "right" }}
                          className="badge badgeCustom bg-success"
                        >
                          {note.category}
                        </spam>
                      </Accordion.Toggle>{" "}
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body className="pt-2">
                        <Card.Title></Card.Title>
                        <Card.Text>{note.content}</Card.Text>
                        <p style={{ float: "left", margin: "16px 0px" }}>
                          created on - {note.createdAt.substring(0, 10)}
                        </p>
                        <div style={{ textAlign: "right" }}>
                          {/* <FormControlLabel
                                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" style={{textAlign:'center', fontSize:'40px', marginRight:'0px'}} />}
                                /> */}
                          <Button
                            variant="primary center ta-r"
                            className="btn btn-outline-warning"
                            href={`/note/${note._id}`}
                          >
                            <EditRoundedIcon />
                          </Button>
                          <Button
                            variant="primary center ta-r"
                            className="btn btn-outline-danger ms-2"
                            onClick={() => handlemodal(note)}
                          >
                            <DeleteRoundedIcon />
                          </Button>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </>
          )):null}
      </div>
      <div>
        {modal ? (
          <Modal show={show} onHide={handleClose} className="modal" centered>
            <Modal.Header>
              <Modal.Title>{modal.title}</Modal.Title>
              <Button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true"></span>
              </Button>
            </Modal.Header>
            <Modal.Body>Are you sure</Modal.Body>
            {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading />}
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => handleDelete(modal._id)}
              >
                Yes
              </Button>
              <Button variant="primary" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default MyNotes;
