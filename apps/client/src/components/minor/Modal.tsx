import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onBlur?: () => void;
  resize?: string;
}

const Modal: React.FC<ModalProps> = ({ children, resize }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        className={`${resize ? resize : "w-full h-full"} bg-white overflow-x-hidden drop-shadow-2xl p-4 rounded-xl flex justify-start items-start flex-wrap gap-5`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
