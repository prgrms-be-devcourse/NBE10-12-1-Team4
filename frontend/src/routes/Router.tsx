import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "../admin/product/Product";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/product",
    element: <ProductPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;