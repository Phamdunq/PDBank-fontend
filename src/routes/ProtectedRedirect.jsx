import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRedirect = () => {
    const { user } = useAuth();
    // if (user === null) {
    //     return <div>Loading...</div>;  // Chờ AuthContext cập nhật user
    // }
    if (!user) return <Navigate to="/login" replace />;
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
};

export default ProtectedRedirect;
