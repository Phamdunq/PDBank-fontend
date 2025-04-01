

import { Layout, Menu, Card, Form, Input, Button, Upload, Avatar } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import BreadcrumbNav from "../../components/User/BreadcrumbNav";

const { Content, Sider } = Layout;

const ProfileUserPage = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Content */}
            <Content style={{ padding: "20px" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Hồ sơ cá nhân" }
                    ]}
                />
                <Card title="Thông tin cá nhân">
                    <Form layout="vertical">
                        <div style={{ display: "flex", gap: "20px" }}>
                            {/* Avatar Upload */}
                            <Form.Item>
                                <Upload showUploadList={false}>
                                    <Avatar
                                        size={80}
                                        icon={<UserOutlined />}
                                        style={{ cursor: "pointer", backgroundColor: "#ddd" }}
                                    />
                                    <CameraOutlined style={{ position: "absolute", marginLeft: "-20px", fontSize: "16px" }} />
                                </Upload>
                            </Form.Item>

                            {/* Form Fields */}
                            <div style={{ flex: 1 }}>
                                <Form.Item label="Họ tên">
                                    <Input defaultValue="Admin" />
                                </Form.Item>

                                <Form.Item label="Email">
                                    <Input defaultValue="trinhsytuan@gmail.com" />
                                </Form.Item>

                                <Form.Item label="Tài khoản">
                                    <Input defaultValue="sysadmin" disabled />
                                </Form.Item>

                                <Form.Item label="Vai trò">
                                    <Input defaultValue="Quản trị viên" disabled />
                                </Form.Item>

                                <Form.Item label="Điện thoại">
                                    <Input defaultValue="0948921741" />
                                </Form.Item>
                            </div>
                        </div>

                        <Button type="primary" block>
                            Lưu thông tin
                        </Button>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default ProfileUserPage;
