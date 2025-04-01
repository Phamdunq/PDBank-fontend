import { useState } from "react";
import {
    Layout,
    Steps,
    Card,
    Row,
    Col,
    Input,
    Button,
    Typography,
    message,
    Avatar,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchOtpApi } from "../../../services/otpService";
import BreadcrumbNav from "../BreadcrumbNav";
import { UserOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Content } = Layout;
const { Text } = Typography;

const TransferForm = () => {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { fullName, accountNumber } = location.state || {};
    const { accounts, customer } = useAuth();
    const [note, setNote] = useState(`${customer.fullName} Chuyển tiền`);
    console.log("note data:", note)
    const amounts = [
        100000, 200000, 500000, 1000000, 5000000, 10000000, 20000000, 30000000,
    ];

    const handleContinue = async () => {
        if (!amount || amount <= 0) {
            message.error("Vui lòng nhập số tiền hợp lệ!");
            return;
        }
        if (amount > accounts?.[0]?.balance) {
            message.error("Số dư không đủ!");
            return;
        }

        const emailUser = customer.email;
        const res = await fetchOtpApi(emailUser);

        if (res.data && res.data.EC === 0) {
            message.success("OTP đã được gửi đến email của bạn.");



            // Chuyển đến trang xác nhận luôn, không hiển thị modal OTP
            navigate("/user/transfer/form/xacnhan", {
                state: { amount, note, accountNumber, fullName },
            });
        }




    };

    return (
        <Layout>
            <Content style={{ padding: "20px", minHeight: "100vh" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Chuyển tiền", path: "/user/transfer" },
                        { label: "Chuyển tiền nội bộ PdBank" },
                    ]}
                />

                {/* Tiến trình chuyển tiền */}
                <Steps current={0} style={{ marginBottom: 20 }}>
                    <Step title="Khởi tạo" />
                    <Step title="Xác nhận" />
                    <Step title="Kết quả" />
                </Steps>

                {/* Tài khoản nguồn và đích */}
                <Card style={{ textAlign: "center", marginBottom: 20 }}>
                    <Row gutter={16} align="middle">
                        <Col span={10}>
                            <Card hoverable>
                                <Row align="middle">
                                    <Col>
                                        <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Text strong>{accounts?.[0]?.accountNumber}</Text>
                                        </Row>
                                        <Row>
                                            <Text type="secondary">
                                                {accounts?.[0]?.balance?.toLocaleString()} VND
                                            </Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col span={4}>
                            <Text style={{ fontSize: "24px" }}>→</Text>
                        </Col>

                        <Col span={10}>
                            <Card hoverable>
                                <Row align="middle" justify="end">
                                    <Col>
                                        <Row justify="end">
                                            <Text strong>{accountNumber}</Text>
                                        </Row>
                                        <Row>
                                            <Text type="secondary">{fullName}</Text>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Avatar style={{ marginLeft: 10 }} icon={<UserOutlined />} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Nhập số tiền và nội dung giao dịch */}
                <Card title="Thông tin giao dịch">
                    <Card style={{ margin: "0px 200px 0px 200px" }}>
                        <Input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                            placeholder="Nhập số tiền"
                            suffix="VND"
                        />

                        {/* Danh sách các số tiền có sẵn */}
                        <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
                            {amounts.map((amt) => (
                                <Col span={6} key={amt}>
                                    <Button
                                        block
                                        type={amt === amount ? "primary" : "default"}
                                        onClick={() => setAmount(amt)}
                                    >
                                        {amt.toLocaleString()} VND
                                    </Button>
                                </Col>
                            ))}
                        </Row>

                        {/* Nội dung giao dịch */}
                        <Text strong style={{ display: "block", marginTop: 20 }}>
                            Nội dung giao dịch
                        </Text>
                        <Input.TextArea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            maxLength={50}
                            showCount
                        />

                        {/* Nút Tiếp tục */}
                        <Button
                            type="primary"
                            block
                            style={{ marginTop: 20 }}
                            onClick={handleContinue}
                        >
                            Tiếp tục
                        </Button>
                    </Card>
                </Card>
            </Content>
        </Layout>
    );
};

export default TransferForm;
