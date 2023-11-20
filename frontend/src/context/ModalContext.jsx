// ModalProvider.js
import React, { createContext, useContext } from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = React.useState({});

  const showModal = (content) => {
    setModalContent(content);
    onOpen();
  };

  const hideModal = () => {
    onClose();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={modalContent.size ? modalContent.size : "md"}
        closeOnEsc={true}
      >
        <ModalContent>
          <ModalHeader>{modalContent.header}</ModalHeader>
          {modalContent.closeButton && <ModalCloseButton />}
          <ModalBody>{modalContent.body}</ModalBody>
          <ModalFooter>{modalContent.footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};
