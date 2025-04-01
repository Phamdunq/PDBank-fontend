import { Layout, Menu, Avatar, Typography, Dropdown, Row, Col } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const HeaderComponent = () => {
    const { Header } = Layout;
    const { Text } = Typography;
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    // Xử lý đăng xuất
    const handleLogout = () => {
        logout(); // Xóa dữ liệu trong localStorage và context
        navigate("/login"); // Chuyển về trang login
    };

    // Xác định đường dẫn trang hồ sơ dựa trên role
    const profilePath = user?.role === "admin" ? "/admin/profile" : "/user/profile";

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<SettingOutlined />} onClick={() => navigate(profilePath)}>
                Hồ sơ cá nhân
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    // const items1 = ['Trang chủ', 'Dịch vụ', 'Liên hệ'].map((key, index) => ({
    //     key: String(index + 1),
    //     label: key,
    // }));

    return (
        // <Header
        //     style={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         backgroundColor: 'white',
        //         padding: '0 20px',
        //     }}
        // >
        //     <div style={{ display: 'flex', alignItems: 'center' }}>
        //         <div style={{ fontSize: 25, fontWeight: 'bold' }}>Pdbank</div>
        //     </div>
        //     <Menu
        //         mode="horizontal"
        //         defaultSelectedKeys={['1']}
        //         items={items1}
        //         style={{ flex: 1, minWidth: 0, marginLeft: 100 }}
        //     />
        //     <div style={{ display: 'flex', alignItems: 'center' }}>
        //         <Dropdown overlay={userMenu} trigger={['click']}>
        //             <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        //                 <Avatar
        //                     size="large"
        //                     icon={<UserOutlined />}
        //                     style={{ marginRight: 10 }}
        //                 />
        //                 <div>Tên người dùng</div>
        //             </div>
        //         </Dropdown>
        //     </div>
        // </Header>
        <Header
            style={{
                backgroundColor: 'white',
            }}
        >
            <Row align="middle" justify="space-between">
                {/* Logo SmartBanking */}
                <Col>
                    <h2>PdBank</h2>
                </Col>

                <Col>
                    <Dropdown overlay={userMenu} trigger={['click']}>
                        <Row align="middle">
                            <Col>
                                <Row justify="end">
                                    <Text style={{ color: "#888", fontSize: "12px" }}>Chào buổi tối!</Text>
                                </Row>
                                <Row>
                                    <Text>PHẠM QUỐC DŨNG</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Avatar style={{ marginLeft: "10px" }} icon={<UserOutlined />} />
                            </Col>
                        </Row>
                    </Dropdown>
                </Col>

            </Row>
        </Header >
    );
}

export default HeaderComponent;
