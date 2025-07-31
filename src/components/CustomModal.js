import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalActions,
  Button,
} from "@dhis2/ui";
import "../styles/customModal.css";

export const CustomModal = ({ onClose, children, title, onConfirm }) => (
  <Modal onClose={onClose} medium position="middle">
    <ModalTitle>{title}</ModalTitle>
    <ModalContent>{children}</ModalContent>
    <ModalActions>
      <div className="modal-button">
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
        <Button onClick={onConfirm} primary>
          Confirm
        </Button>
      </div>
    </ModalActions>
  </Modal>
);
