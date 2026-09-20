import Navbaradmin from "../components/admin/Navbaradmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-screen min-h-screen flex-col">
      <Navbaradmin />
      <div className="flex w-full flex-col p-2">{children}</div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
