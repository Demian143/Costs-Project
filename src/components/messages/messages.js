import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const success = (message) => {
  toast.success(message.toString(), {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const error = (message) => {
  toast.error(message.toString(), {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export { success, error };
