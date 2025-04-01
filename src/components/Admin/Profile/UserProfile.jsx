import { useState } from "react";
import { Layout, Menu, Form, Input, Button, Upload, Avatar, Card, Row, Col, message, Typography, notification } from "antd";
import { CameraOutlined, CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { updateUserPasswordAPI } from "../../../services/userService";
import DigitalSignatureModal from "./DigitalSignatureModal";


const { Text, Title } = Typography

const UserProfile = () => {
    const { Sider, Content } = Layout;
    const [form] = Form.useForm();
    const [selectedKey, setSelectedKey] = useState("1"); // Mặc định chọn "Thông tin cá nhân"
    const { user, customer } = useAuth(); // Lấy thông tin user từ context
    const [loading, setLoading] = useState(false);
    // Đường dẫn ảnh mặc định nếu user chưa có avatar
    const [avatar, setAvatar] = useState(customer?.profilePicture || "/src/styles/image/520.jpg");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Xử lý khi chọn ảnh đại diện
    const handleUpload = (info) => {
        if (info.file.status === "done") {
            setAvatar(URL.createObjectURL(info.file.originFileObj));
        }
    };

    // Xử lý cập nhật mật khẩu
    const handlePasswordChange = async (values) => {
        const { oldPassword, newPassword } = values;

        // if (newPassword !== confirmPassword) {
        //     message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        //     return;
        // }

        try {
            setLoading(true);
            const res = await updateUserPasswordAPI({
                id: user.id,
                oldPassword,
                newPassword,
            });

            if (res && res.data.EC === 0) {
                message.success("Cập nhật mật khẩu thành công!");
                form.resetFields(); // Reset form sau khi cập nhật thành công
            } else {
                message.error(res.data.EM);
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const [certificate, setCertificate] = useState("-----BEGIN CERTIFICATE----");
    const [privateKey, setPrivateKey] = useState("-----BEGIN PRIVATE KEY-----");



    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        message.success("Đã sao chép!");
    };

    const handleDownload = (text, filename) => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };


    // Nội dung tương ứng với từng mục menu
    const renderContent = () => {
        switch (selectedKey) {
            case "1":
                return (
                    <Card title="Thông tin cá nhân">
                        <Form form={form} layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Ảnh đại diện" style={{ textAlign: "center" }}>
                                        <Upload showUploadList={false} customRequest={handleUpload}>
                                            <Avatar
                                                src={avatar}
                                                icon={!avatar && <CameraOutlined />}
                                                style={{ border: "1px solid #ddd", cursor: "pointer" }}
                                            />
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item label="Tài khoản">
                                        <Input defaultValue={customer?.fullName || "N/A"} disabled />
                                    </Form.Item>
                                    <Form.Item label="Vai trò">
                                        <Input defaultValue={user?.role || "N/A"} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Họ tên">
                                        <Input defaultValue={customer?.fullName || ""} />
                                    </Form.Item>
                                    <Form.Item label="Email">
                                        <Input defaultValue={customer?.email || ""} />
                                    </Form.Item>
                                    <Form.Item label="Điện thoại">
                                        <Input defaultValue={customer?.phoneNumber || ""} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" style={{ width: "100%" }}>Lưu thông tin</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                );
            case "2":
                return (
                    <Card title="Thông tin mật khẩu">
                        <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
                            <Form.Item
                                label="Mật khẩu cũ"
                                name="oldPassword"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu cũ" />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                                    // { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>
                            <Form.Item
                                label="Nhập lại mật khẩu mới"
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
                                    // ({ getFieldValue }) => ({
                                    //     validator(_, value) {
                                    //         if (!value || getFieldValue("newPassword") === value) {
                                    //             return Promise.resolve();
                                    //         }
                                    //         return Promise.reject(new Error("Mật khẩu không khớp!"));
                                    //     },
                                    // }),
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit" style={{ width: "100%" }}
                                    loading={loading}
                                >
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card >
                );
            case "3":
                return (
                    // <Card title="Cài đặt hữ ký số">
                    //     <Col>
                    //         <Row>
                    //             <Button
                    //                 type="primary"
                    //                 onClick={() => setIsModalOpen(true)}
                    //             >
                    //                 Tạo chữ ký số
                    //             </Button>
                    //         </Row>
                    //     </Col>
                    //     <DigitalSignatureModal
                    //         isModalOpen={isModalOpen}
                    //         setIsModalOpen={setIsModalOpen}
                    //     />
                    // </Card>
                    <Card title={<Title level={5}>Tạo Chữ Ký Số</Title>}>
                        <Title level={5}>Khóa công khai (Certificate)</Title>
                        <Input.TextArea rows={4} value={certificate} readOnly />
                        <Row gutter={8} style={{ marginTop: 8 }}>
                            <Col><Button icon={<CopyOutlined />} onClick={() => handleCopy(certificate)}>Sao chép</Button></Col>
                            <Col><Button icon={<DownloadOutlined />} onClick={() => handleDownload(certificate, "certificate.pem")}>Tải xuống</Button></Col>
                        </Row>

                        <Title level={5} style={{ marginTop: 16 }}>Khóa bí mật (Private Key)</Title>
                        <Input.TextArea rows={4} value={privateKey} readOnly />
                        <Row gutter={8} style={{ marginTop: 8 }}>
                            <Col><Button icon={<CopyOutlined />} onClick={() => handleCopy(privateKey)}>Sao chép</Button></Col>
                            <Col><Button icon={<DownloadOutlined />} onClick={() => handleDownload(privateKey, "privateKey.pem")}>Tải xuống</Button></Col>
                        </Row>

                        <Button type="primary" block style={{ marginTop: 16 }} onClick={() => { setIsModalOpen(true) }}>Tạo chữ ký số</Button>
                        <DigitalSignatureModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            certificate={certificate}
                            setCertificate={setCertificate}
                            privateKey={privateKey}
                            setPrivateKey={setPrivateKey}
                        />
                    </Card>

                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar Menu */}
            <Sider width={250} theme="light" style={{ background: "#fff", padding: "20px 10px" }}>
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    onClick={(e) => setSelectedKey(e.key)} // Cập nhật menu khi click
                >
                    <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
                    <Menu.Item key="2">Thông tin mật khẩu</Menu.Item>
                    <Menu.Item key="3">Chữ ký số</Menu.Item>
                </Menu>
            </Sider>

            {/* Nội dung chính */}
            <Content style={{ marginLeft: 20, maxWidth: 800 }}>
                {renderContent()}
            </Content>
        </div>
    );
};

export default UserProfile;
