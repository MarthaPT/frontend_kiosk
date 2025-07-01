import UserMenu from "@/pages/User/Menu/UserMenu"
import { Routes } from "../types/routes";
import StartUser from "@/pages/User/StartUser";

const User_Routes: Routes =[
    {
        path: "/startuser",
        element: <StartUser/>
    },
    {
        path: "/user",
        element: <UserMenu/>
    }
]

export default User_Routes;