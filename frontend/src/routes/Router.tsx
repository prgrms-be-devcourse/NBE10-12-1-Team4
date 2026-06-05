import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;