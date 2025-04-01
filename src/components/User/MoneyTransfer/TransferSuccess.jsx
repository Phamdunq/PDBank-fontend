
import { Layout, Steps, Card, Typography, Button, Row, Col } from "antd";
import { CameraOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import BreadcrumbNav from "../BreadcrumbNav";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Step } = Steps;
const { Text, Title } = Typography;

const TransferSuccess = () => {

    const location = useLocation();
    const { amount, toAccount, fullName, note } = location.state || {};
    const navigate = useNavigate();

    return (
        <Layout>

            <Content style={{ padding: "20px", minHeight: "100vh" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Chuyển tiền", path: "/user/transfer" },
                        { label: "Nhập thông tin", path: "/user/transfer/form" },
                        { label: "Xác nhận", path: "/user/transfer/form/xacnhan" },
                        { label: "Thành công" }
                    ]}
                />
                <Steps current={2} style={{ marginBottom: "20px" }}>
                    <Step title="Khởi tạo" />
                    <Step title="Xác nhận" />
                    <Step title="Kết quả" />
                </Steps>

                {/* Card hiển thị kết quả giao dịch */}
                <Card style={{ textAlign: "center", borderRadius: 8, padding: 24 }}>
                    {/* Logo ngân hàng */}
                    <Title level={2} style={{ color: "#2c82c9" }}>
                        BIDV
                    </Title>
                    <Text strong style={{ fontSize: 16, display: "block", marginBottom: 16 }}>
                        Giao dịch thành công
                    </Text>

                    {/* Nội dung giao dịch */}
                    <Text>
                        Quý khách đã chuyển thành công số tiền <strong>{amount} VND</strong> đến số tài khoản <br />
                        <strong>{toAccount} / {fullName} / BIDV</strong> vào lúc <strong>25/03/2025 00:11:48</strong>. <br />
                        Nội dung: <strong>{note}</strong>.
                    </Text>

                    {/* Số tham chiếu */}
                    <Text style={{ display: "block", marginTop: 16 }}>
                        Số tham chiếu: <Text strong style={{ color: "#2c82c9" }}>0394KFQ-7ybr19Sa</Text>
                    </Text>

                    {/* Các nút chức năng */}
                    {/* <Row justify="center" gutter={[16, 16]} style={{ marginTop: 24 }}>
                        <Col span={6}>
                            <Button type="link" icon={<CameraOutlined />} block>
                                Chụp màn hình
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button type="link" icon={<MailOutlined />} block>
                                Gửi email
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button type="link" icon={<SaveOutlined />} block>
                                Lưu mẫu
                            </Button>
                        </Col>
                    </Row> */}

                    {/* Nút tạo giao dịch mới */}
                    <Row justify="center" style={{ marginTop: 24 }}>
                        <Button type="primary" onClick={() => navigate("/user/transfer")}>
                            Tạo giao dịch mới
                        </Button>
                    </Row>
                </Card>
            </Content>
        </Layout >
    );
};

export default TransferSuccess;
