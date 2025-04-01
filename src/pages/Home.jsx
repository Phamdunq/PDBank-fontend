import { Layout, Button, Card, Row, Col, Image, Divider, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, SwapOutlined, CreditCardOutlined, GiftOutlined, BankOutlined, FormOutlined, SafetyOutlined, StockOutlined, HeartOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const { accounts } = useAuth();
    const [showBalance, setShowBalance] = useState(false);
    const firstAccount = accounts?.[0];
    const balance = firstAccount?.balance ? `${firstAccount.balance.toLocaleString()} VND` : "0 VND";

    const services = [
        { icon: <BankOutlined />, title: "Dịch vụ ngân hàng", description: "Ngân hàng số 24/7 đáp ứng mọi nhu cầu...", count: 5 },
        { icon: <FormOutlined />, title: "Đăng ký dịch vụ", description: "Đăng ký bất kỳ dịch vụ nào chỉ trong vài phút...", count: 8 },
        { icon: <SafetyOutlined />, title: "Dịch vụ bảo hiểm", description: "Kiến tạo tương lai vững chắc với bảo hiểm nhân thọ...", count: 1 },
        { icon: <StockOutlined />, title: "Quản lý đầu tư", description: "Đầu tư linh hoạt thông qua app tài chính online...", count: 3 },
        { icon: <CustomerServiceOutlined />, title: "Hỗ trợ khách hàng", description: "Tra cứu thông tin tài khoản, giao dịch và tư vấn cá nhân...", count: 5 },
        { icon: <HeartOutlined />, title: "Từ thiện cùng BIDV", description: "Chung tay BIDV đóng góp vào quỹ từ thiện", count: 2 },
    ];

    return (
        <Layout>
            <Content>
                <Image src="/src/styles/image/520.jpg" width="100%" height={200} />
                <Card style={{ margin: "-100px 100px 10px 100px" }}>
                    <Row justify="space-between" align="middle">
                        {/* Tài khoản thanh toán */}
                        <Col>
                            <Row><Text style={{ fontSize: "16px" }}>Tài khoản thanh toán</Text></Row>
                            <Row><Title level={3}>{firstAccount ? firstAccount.accountNumber : "Không có dữ liệu"}</Title></Row>
                        </Col>
                        {/* Số dư khả dụng */}
                        <Col>
                            <Row align="middle" gutter={[16, 0]}>
                                <Col>
                                    <Row justify="end"><Text style={{ color: "#888", fontSize: "12px" }}>Số dư khả dụng</Text></Row>
                                    <Row>
                                        <Text style={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "#333" }} onClick={() => setShowBalance(!showBalance)}>
                                            {showBalance ? balance : "**********"}{" "}
                                            {showBalance ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                        </Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <Button onClick={() => navigate("/user/list")}>Danh sách →</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={12} sm={6}>
                            <Card hoverable onClick={() => navigate("/user/transfer")} style={{ backgroundColor: "#f0f8ff" }} >
                                <SwapOutlined />
                                <h3>Chuyển tiền</h3>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Card hoverable style={{ backgroundColor: "#f0f8ff" }}>
                                <CreditCardOutlined />
                                <h3>Dịch vụ thẻ</h3>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Card hoverable style={{ backgroundColor: "#f0f8ff" }}>
                                <BankOutlined />
                                <h3>Tiết kiệm Online</h3>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Card hoverable style={{ backgroundColor: "#f0f8ff" }}>
                                <GiftOutlined />
                                <h3>Membership Rewards</h3>
                            </Card>
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Chuyển tiền ngoài PdBank</Card></Col>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Gửi tiết kiệm Online</Card></Col>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Nạp tiền điện thoại</Card></Col>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Chuyển tiền quốc tế</Card></Col>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Gửi tích lũy Online</Card></Col>
                        <Col span={6}><Card hoverable style={{ backgroundColor: "#e6f7ff" }}>Mã số đẹp Như ý</Card></Col>
                    </Row>
                    {/* Xem tất cả dịch vụ */}
                    <Row justify="center" style={{ marginTop: "20px" }}>
                        <Button type="primary" ghost size="large">
                            Xem tất cả dịch vụ
                        </Button>
                    </Row>
                </Card>

                <Card style={{ margin: "20px 100px 10px 100px" }}>
                    <Row justify="space-between" align="middle">
                        <Col><h3>Quý khách quan tâm dịch vụ gì hôm nay?</h3></Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 16]} justify="center">
                        {services.map((service, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <Card hoverable style={{ backgroundColor: "#f0f8ff" }}>
                                    <div>{service.icon}</div>
                                    <div>
                                        <h4>{service.title}</h4>
                                        <p>{service.description}</p>
                                        <p>{service.count} Dịch vụ</p>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>

                <Card title="Cài đặt" style={{ margin: "20px 100px 10px 100px" }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={6}>
                            <Card hoverable onClick={() => navigate("/user/ChangePassword")} style={{ backgroundColor: "#f0f8ff" }}>
                                <LockOutlined />
                                <h3>Đổi mật khẩu</h3>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default Home;
