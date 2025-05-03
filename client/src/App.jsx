import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter({
  path: "/",
});

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
