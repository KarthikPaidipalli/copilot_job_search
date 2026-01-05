import { Navigate, RouteObject } from "react-router-dom";
import { route as authRoute } from "@/routes/auth/auth";
import { route as copilotRoute } from "@/routes/copilot";
import { NotFoundPage } from "@/pages/not-found";

export const routes : RouteObject[] = [
    {
        path:"/",
        element:<Navigate to="/auth/signin" replace/>,
    },
    authRoute,
    copilotRoute,
    {
        path:"*",
        element:<NotFoundPage />,
    }
];