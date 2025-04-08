import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Register from '../pages/register';
import LoginPage from '../pages/login';
import styled from "styled-components";

const DarkModal = styled(Modal.Header)`
  background-color: #5c5857;
`;

export default function AccountModal({ show, onHide, action, setAction }) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <DarkModal closeButton  /> {/* Ensure this closes the modal */}
      <Modal.Body>
        {action === "register" ? (
          <Register setAction={setAction} />
        ) : (
          <LoginPage setAction={setAction} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button> {/* Close button works here too */}
      </Modal.Footer>
    </Modal>
  );
}
