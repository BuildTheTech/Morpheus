import { ReactElement } from "react";
import { Id, toast } from "react-toastify";

interface MyToastProps {
  title: string | ReactElement;
  content: string | ReactElement;
  toastType: "success" | "error";
}

export const myToast = ({ title, content, toastType }: MyToastProps) => {
  let toastId: Id = "";

  const dismiss = () => {
    toast.dismiss(toastId);
  };

  toastId = toast(
    <div className="toast-body-wrapper">
      <div className={`toast-body toast-${toastType}`}>
        <div className="toast-title">
          {title}
          <div className="divider"></div>
          <button onClick={dismiss}></button>
        </div>
        <div className="toast-content">{content}</div>
      </div>
    </div>,
    { closeButton: false }
  );
};
