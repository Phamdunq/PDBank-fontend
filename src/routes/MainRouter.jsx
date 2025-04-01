import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";  // Import bảo vệ route
import LayoutAdmin from "../components/Admin/LayoutAdmin";
import LayoutUser from "../components/User/LayoutUser";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from '../pages/Admin/ProfilePage';
import TransactionPage from "../pages/Admin/TransactionPage";
import DashboardPage from "../pages/Admin/DashboardPage";
import AccountPage from "../pages/Admin/AccountPage";
import CustomerPage from "../pages/Admin/CustomerPage";
import TransferPage from "../pages/User/TransferPage";
import AccountListPage from "../pages/User/AccountListPage";
import Home from "../pages/Home";
import ProfileUserPage from "../pages/User/ProfileUserPage";
import TransferForm from "../components/User/MoneyTransfer/TransferForm";
import TransactionConfirmation from "../components/User/MoneyTransfer/TransactionConfirmation";
import ProtectedRedirect from "./ProtectedRedirect";
import TransferSuccess from "../components/User/MoneyTransfer/TransferSuccess";
import AccountDetails from "../components/User/BankAccounts/AccountDetails";
import ChangePassword from "../components/User/Setting/ChangePassword";
import UserPage from "../pages/Admin/UserPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRedirect />, // Tự động chuyển hướng đến trang phù hợp
    },
    // Bảo vệ route của Admin
    {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,  // Chỉ admin mới truy cập
        children: [
            {
                path: "",
                element: <LayoutAdmin />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "account", element: <AccountPage /> },
                    { path: "customer", element: <CustomerPage /> },
                    { path: "transaction", element: <TransactionPage /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "user", element: <UserPage /> }

                ]
            }
        ]
    },

    // Bảo vệ route của User
    {
        path: "/user",
        element: <ProtectedRoute allowedRoles={["user"]} />,  // Chỉ user mới truy cập
        children: [
            {
                path: "",
                element: <LayoutUser />,
                children: [
                    { index: true, element: <Home /> },
                    { path: "transfer", element: <TransferPage /> },
                    {
                        path: "list",
                        element: <AccountListPage />,
                    },
                    { path: "list/:accountNumber", element: <AccountDetails />, },

                    { path: "profile", element: <ProfileUserPage /> },
                    { path: "ChangePassword", element: <ChangePassword /> },
                    // {
                    //     path: "transfer",
                    //     element: <TransferPage />,
                    //     children: [
                    //         { path: "form", element: <TransferForm /> }, // Route con của TransferPage
                    //     ]
                    // }
                    { path: "transfer/form", element: <TransferForm /> },
                    { path: "transfer/form/xacnhan", element: <TransactionConfirmation /> },
                    { path: "transfer/form/xacnhan/success", element: <TransferSuccess /> },
                ]
            }
        ]
    },


    // // Trang chính không cần bảo vệ
    // {
    //     path: "/",
    //     element: <LayoutUser />,
    //     children: [
    //         { index: true, element: <Home /> }
    //     ]
    // },

    // Các trang không cần bảo vệ
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <Register /> }
]);

export default router;
