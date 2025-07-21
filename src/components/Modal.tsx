import { ReactNode } from "react";


type Props = {
  children: ReactNode;
  showModal: boolean;
  hideModal: () => void;
};
export default function Modal({ children, showModal, hideModal }: Props){
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={hideModal}
      />
      <div
        className={`relative shadow-2xl transform transition-all duration-300 ${
          showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {children}
      </div>
    </div>
  );
};