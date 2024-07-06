import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.87;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 300px;
  width: 50%;
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const WarningDeleteModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalOverlay>
        <ModalContent>
          <h2>경고!</h2>
          <p>{message}</p>
          <ModalButton onClick={onConfirm}>확인</ModalButton>
          <ModalButton onClick={onCancel}>취소</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </ModalOverlay>
  );
};

export default WarningDeleteModal;
