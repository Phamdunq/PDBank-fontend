import { Layout, Menu, Avatar, Typography, Dropdown, Row, Col } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const HeaderUser = () => {
    const { Header } = Layout;
    const { Text } = Typography;
    const navigate = useNavigate();
    const { user, customer, logout } = useContext(AuthContext); // Lấy customer từ context
    // const isLoggedIn = Boolean(user && customer);

    // Xử lý đăng xuất
    const handleLogout = () => {
        logout(); // Xóa dữ liệu trong localStorage và context
        navigate("/login"); // Chuyển về trang login
    };

    // // Xác định đường dẫn trang hồ sơ dựa trên role
    // const profilePath = user?.role === "admin" ? "/admin/profile" : "/user/profile";

    const userMenu = (
        <Menu>
            {/* <Menu.Item key="profile" icon={<SettingOutlined />} onClick={() => navigate("/user/profile")}>
                Hồ sơ cá nhân
            </Menu.Item> */}
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{
                backgroundColor: "white",
            }}
        >
            <Row align="middle" justify="space-between">
                {/* Logo SmartBanking */}
                <Col>
                    <h2>PdBank</h2>
                </Col>

                <Col>
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                        <Row align="middle" style={{ cursor: "pointer" }}>
                            <Col style={{ marginRight: "10px" }}>
                                <Row justify="end">
                                    <Text style={{ color: "#888", fontSize: "12px" }}>Xin chào!</Text>
                                </Row>
                                <Row>
                                    <Text style={{ fontWeight: "bold" }}>{customer.fullName}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Avatar src={customer.avatar || undefined} icon={<UserOutlined />} />
                            </Col>
                        </Row>
                    </Dropdown>
                </Col>

            </Row>
        </Header>
    )
}

export default HeaderUser;
