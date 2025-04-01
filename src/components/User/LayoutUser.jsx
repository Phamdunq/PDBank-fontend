import { Outlet } from "react-router-dom"
import HeaderUser from "./Header"
import FooterUser from "./Footer"


const LayoutUser = () => {

    return (
        <>
            <HeaderUser />
            <Outlet />
            <FooterUser />
        </>
    )
}

export default LayoutUser