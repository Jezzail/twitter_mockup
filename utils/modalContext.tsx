import React, { createContext, ReactNode, useState } from "react";

const ModalContext = createContext({
  modalOpen: false,
  postId: "",
  setModal: (status: boolean) => {},
  setPost: (id: string) => {},
});

export default ModalContext;

type Props = {
  children: ReactNode;
};

export const AuthModalProvider = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState("");

  const setModal = (status: boolean) => {
    setModalOpen(status);
  };

  const setPost = (id: string) => {
    setPostId(id);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen: modalOpen,
        postId: postId,
        setModal: setModal,
        setPost: setPost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
