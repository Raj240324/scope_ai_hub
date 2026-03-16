/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState('');
  const [modalType, setModalType] = useState('student'); // 'student' or 'trainer'

  const openModal = (courseName = 'General Inquiry', type = 'student') => {
    setModalCourse(courseName);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCourse('');
    setModalType('student');
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, modalCourse, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
