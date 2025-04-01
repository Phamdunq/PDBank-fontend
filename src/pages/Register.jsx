import { Form, Input, Button, Select, DatePicker, message, Col, Row, Modal } from "antd";
import { useState } from "react";
import { RegisterApi } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { fetchOtpApi, verifyOtpApi } from "../services/otpService";

const { Option } = Select;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const onFinish = async (values) => {
        // setLoading(true);
        // try {
        //     const res = await RegisterApi(values);
        //     console.log("res: ", res.data)
        //     // console.log("res register:", res.data)
        //     if (res && res.data && res.data.EC === 0) {
        //         message.success("Đăng ký thành công!")
        //         navigate('/login')
        //     } else {
        //         console.log(res.EM)
        //         message.error(res.EM);
        //     }
        // } catch (error) {
        //     message.error("Đã xảy ra lỗi, vui lòng thử lại.");
        // }
        // setLoading(false);
        setLoading(true);
        try {
            setEmail(values.email);
            const res = await fetchOtpApi(values.email);
            if (res && res.data && res.data.EC === 0) {
                message.success("OTP đã được gửi đến email của bạn!");
                setOtpModalVisible(true);
            } else {
                message.error(res.EM);
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await verifyOtpApi(email, otp);
            if (res && res.data && res.data.EC === 0) {
                message.success("Xác thực OTP thành công!");
                const values = form.getFieldsValue();
                const res = await RegisterApi(values);
                if (res && res.data && res.data.EC === 0) {
                    message.success("Đăng ký thành công!");
                    navigate("/login");
                } else {
                    message.error(res.EM);
                }
                setOtpModalVisible(false);
            } else {
                message.error("OTP không hợp lệ, vui lòng thử lại!");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xác thực OTP.");
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <div
                    style={{
                        padding: "30px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Đăng Ký Tài Khoản</h2>

                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Row gutter={24}>
                            {/* Cột 1 */}
                            <Col span={12}>
                                <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: "Nhập số điện thoại!" }]}>
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>
                                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Nhập mật khẩu!" }]}>
                                    <Input.Password placeholder="Nhập mật khẩu" />
                                </Form.Item>
                                <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: "Nhập họ và tên!" }]}>
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Email không hợp lệ!" }]}>
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                            </Col>

                            {/* Cột 2 */}
                            <Col span={12}>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input placeholder="Nhập địa chỉ" />
                                </Form.Item>
                                <Form.Item label="Giới tính" name="gender">
                                    <Select placeholder="Chọn giới tính">
                                        <Option value="male">Nam</Option>
                                        <Option value="female">Nữ</Option>
                                        <Option value="other">Khác</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="CCCD/CMND" name="identityNumber" rules={[{ required: true, message: "Nhập số CCCD/CMND!" }]}>
                                    <Input placeholder="Nhập số CCCD/CMND" />
                                </Form.Item>
                                <Form.Item label="Ngày sinh" name="dateOfBirth">
                                    <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} block>Đăng Ký</Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Link to="/login">Quay lại trang đăng nhập</Link>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
            <Modal title="Nhập Mã OTP" visible={otpModalVisible} onOk={handleVerifyOtp} onCancel={() => setOtpModalVisible(false)}>
                <p>Vui lòng nhập mã OTP đã gửi đến email của bạn.</p>
                <Input placeholder="Nhập OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Modal>
        </Row>
    );
};

export default Register;
