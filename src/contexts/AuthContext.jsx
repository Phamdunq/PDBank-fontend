import { createContext, useState, useEffect, useContext } from "react";
import { message } from "antd";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [token, setToken] = useState(null);

    // Load dữ liệu từ localStorage khi F5
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("token");
        const storedExpiration = localStorage.getItem("tokenExpiration");

        if (storedUser && storedToken && storedExpiration) {
            const expirationTime = parseInt(storedExpiration, 10);
            if (Date.now() > expirationTime) {
                logout(); // Token hết hạn → Đăng xuất
            } else {
                const parsedData = JSON.parse(storedUser);
                setUser(parsedData.user);
                setCustomer(parsedData.customer);
                setAccounts(parsedData.accounts);
                setTransactions(parsedData.transactions);
                setToken(storedToken);

                // Kiểm tra token hết hạn mỗi phút
                const interval = setInterval(() => {
                    if (Date.now() > expirationTime) {
                        message.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
                        logout();
                    }
                }, 60000);
                return () => clearInterval(interval);
            }
        }
    }, []);

    const login = (data) => {
        setUser(data.user);
        setCustomer(data.customer);
        setAccounts(data.accounts);
        setTransactions(data.transactions);
        setToken(data.token);

        // Lấy thời gian hết hạn từ JWT
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000; // Chuyển từ giây sang mili-giây

        // Lưu vào localStorage
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiration", expirationTime);
    };

    const logout = () => {
        setUser(null);
        setCustomer(null);
        setAccounts([]);
        setTransactions([]);
        setToken(null);

        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
    };

    // ⏳ Tự động đăng xuất sau 30 phút không hoạt động
    useEffect(() => {
        let inactivityTimeout;

        const resetTimer = () => {
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(() => {
                message.warning("Bạn đã không hoạt động trong 30 phút, vui lòng đăng nhập lại!");
                logout();
            }, 30 * 60 * 1000); // 30 phút
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        resetTimer();

        return () => {
            clearTimeout(inactivityTimeout);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
        };
    }, []);

    const updateData = (newData) => {
        setUser(newData.user || user);
        setCustomer(newData.customer || customer);
        setAccounts(newData.accounts || accounts);
        setTransactions(newData.transactions || transactions);

        const updatedData = {
            user: newData.user || user,
            customer: newData.customer || customer,
            accounts: newData.accounts || accounts,
            transactions: newData.transactions || transactions,
        };

        localStorage.setItem("userData", JSON.stringify(updatedData));
    };


    return (
        <AuthContext.Provider value={{ user, customer, accounts, transactions, token, login, logout, updateData }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook dùng để lấy dữ liệu từ context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
