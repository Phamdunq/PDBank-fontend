import { useState } from "react";
import { Card, Input, Button, Typography, Row, Col, Layout, message, Modal } from "antd";
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import BreadcrumbNav from "../BreadcrumbNav";
import { useAuth } from "../../../contexts/AuthContext";
import { updateUserPasswordAPI } from "../../../services/userService";
import { fetchOtpApi, verifyOtpApi } from "../../../services/otpService";

const { Text } = Typography;
const { Content } = Layout;

const ChangePassword = () => {
    const { user, customer } = useAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleRequestOtp = async () => {
        setLoading(true);
        try {
            const emailCustomer = customer.email
            const res = await fetchOtpApi(emailCustomer);
            if (res && res.data.EC === 0) {
                message.success("OTP đã được gửi đến email của bạn.");
                setIsModalVisible(true);
            } else {
                message.error(res.data.EM);
            }
        } catch (error) {
            message.error("Lỗi khi gửi OTP, vui lòng thử lại!");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const res = await verifyOtpApi(customer.email, otp);
            if (res && res.data.EC === 0) {
                await handleChangePassword();
            } else {
                message.error("OTP không hợp lệ!");
            }
        } catch (error) {
            message.error("Lỗi xác minh OTP, vui lòng thử lại!");
        }
        setLoading(false);
        setIsModalVisible(false);
    };

    const handleChangePassword = async () => {
        try {
            const res = await updateUserPasswordAPI({
                id: user.id,
                oldPassword,
                newPassword,
            });

            if (res && res.data.EC === 0) {
                message.success("Đổi mật khẩu thành công!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                message.error(res.data.EM);
            }
        } catch (error) {
            message.error("Lỗi khi đổi mật khẩu, vui lòng thử lại!");
        }
    };

    return (
        <Layout>
            <Content style={{ margin: "20px" }}>
                <BreadcrumbNav items={[{ label: "Trang chủ", path: "/user", icon: true }, { label: "Đổi mật khẩu" }]} />
                <Card title="Đổi mật khẩu" style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
                    <Text>
                        Mật khẩu phải thỏa mãn các điều kiện sau:
                        <ul>
                            <li>Có độ dài từ 8 đến 20 ký tự</li>
                            <li>Chứa ít nhất 01 ký tự số, 01 ký tự chữ và 01 ký tự đặc biệt</li>
                        </ul>
                    </Text>

                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu cũ" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                        <Col span={24}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                        <Col span={24}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                    </Row>

                    <Row justify="end" style={{ marginTop: 20 }}>
                        <Button type="primary" loading={loading} onClick={handleRequestOtp}>
                            Đổi mật khẩu
                        </Button>
                    </Row>
                </Card>
            </Content>

            {/* Modal nhập OTP */}
            <Modal title="Xác nhận OTP" visible={isModalVisible} onOk={handleVerifyOtp} onCancel={() => setIsModalVisible(false)} confirmLoading={loading}>
                <Input placeholder="Nhập OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Modal>
        </Layout>
    );
};

export default ChangePassword;
