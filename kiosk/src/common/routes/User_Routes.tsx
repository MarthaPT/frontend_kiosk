import UserMenu from "@/pages/User/Menu/UserMenu"
import { Routes } from "../types/routes";

const User_Routes: Routes =[
    {
        path: "/user",
        element: <UserMenu/>
    }
]

export default User_Routes;