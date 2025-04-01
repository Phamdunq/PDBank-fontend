import { Button, Col, Form, Input, Row, message, Divider } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/userService";
import AuthContext from "../contexts/AuthContext";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const onFinish = async (userData) => {
        setLoading(true);
        const res = await loginAPI(userData);
        if (res && res.data && res.data.EC === 0) {
            message.success("Đăng nhập thành công")
            console.log("data login:", res.data)
            // Gọi hàm login từ AuthContext để lưu user, token, accounts vào Context
            login({
                user: res.data.user,       // Thông tin User
                customer: res.data.customer, // Thông tin Customer
                accounts: res.data.accounts, // Danh sách tài khoản
                transactions: res.data.transactions, // Danh sách giao dịch
                token: res.data.token      // JWT Token
            });

            // Chuyển hướng theo vai trò
            navigate(res.data.user.role === "admin" ? "/admin" : "/user");
        } else {
            message.error(res.data.EM); // Hiển thị lỗi từ backend
        }
        setLoading(false);
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} sm={20} md={16} lg={10} xl={8}>
                <div
                    style={{
                        padding: "30px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Đăng Nhập</h2>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại!" },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại  " />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                type="primary"
                                onClick={() => form.submit()}
                                block
                            >
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />

                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản?{" "}
                        <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </div>
            </Col>
        </Row >
    );
};

export default LoginPage;
