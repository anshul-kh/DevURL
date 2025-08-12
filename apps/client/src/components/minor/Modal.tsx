import React, { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onBlur?: () => void;
  resize?: string;
  onClose?: () => void;
  ref?: React.RefObject<HTMLDivElement>;
  onOutSideClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, resize, onClose, ref = null }) => {
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])
  return (
    <div ref={ref} className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-0 z-96">
      <div
        className={`${resize ? resize : "w-full h-full"} bg-white overflow-x-hidden drop-shadow-2xl p-4 rounded-xl flex justify-start items-start flex-wrap gap-5`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
