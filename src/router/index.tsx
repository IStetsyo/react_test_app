import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SocketSection } from "../pages/SocketSection";
import { WindowsSection } from "../pages/WindowsSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/part2" replace />,
  },
  {
    path: "/part1",
    element: <WindowsSection />,
  },
  {
    path: "/part2",
    element: <SocketSection />,
  },
  {
    path: "*",
    element: <Navigate to="/part2" replace />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
