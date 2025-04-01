import { Layout, Steps, Card, Row, Col, Typography, Button, Input, Form, message, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNav from "../BreadcrumbNav";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { createTransactionApi } from "../../../services/transactionService";
import { verifyOtpApi } from "../../../services/otpService";

const { Content } = Layout;
const { Step } = Steps;
const { Text } = Typography;

const TransactionConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accounts, customer, transactions, updateData } = useAuth();
    const accountId = accounts?.[0]?.id;
    const fromAccount = accounts?.[0]?.accountNumber;
    const toAccount = location.state?.accountNumber;
    const transactionType = "Chuyển tiền";
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { amount, note, accountNumber, fullName } = location.state || {};
    const bankName = "PdBank";
    const fee = 1000;
    const transactionDate = new Date().toLocaleString("vi-VN");
    const handleConfirm = async () => {

        if (!otp) {
            message.error("Vui lòng nhập OTP!");
            return;
        }
        setLoading(true);

        try {
            const emailCustomer = customer?.email;
            const otpRes = await verifyOtpApi(emailCustomer, otp);
            console.log("otp:", otpRes)
            if (!otpRes.data || otpRes.data.EC !== 0) {
                message.error("OTP không hợp lệ! " + (otpRes.data.message || "Lỗi không xác định"));
                setLoading(false);
                return;
            }

            const transactionData = {
                accountId,
                transactionType,
                amount: parseFloat(amount),  // Chuyển về kiểu số
                fromAccount,
                toAccount
            };

            const res = await createTransactionApi(transactionData);
            console.log("Transaction response:", res.data);
            if (res && res.data) {
                message.success("Giao dịch thành công!");

                // Cập nhật lại danh sách giao dịch
                updateData({
                    transactions: transactions ? [...transactions, res.data] : [res.data],
                });

                // Cập nhật lại dữ liệu sau giao dịch
                navigate("/user/transfer/form/xacnhan/success", {
                    state: { amount, toAccount, fullName, note },
                });
            } else {
                message.error("Giao dịch thất bại! " + (res?.data?.message || "Lỗi không xác định"));
            }
        } catch (error) {
            message.error("Lỗi khi gửi yêu cầu! " + error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout>
            <Content style={{ padding: "20px", minHeight: "100vh" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Chuyển tiền", path: "/user/transfer" },
                        { label: "Nhập thông tin", path: "/user/transfer/form" },
                        { label: "Xác nhận" }
                    ]}
                />

                <Steps current={1} style={{ marginBottom: 20 }}>
                    <Step title="Khởi tạo" />
                    <Step title="Xác nhận" />
                    <Step title="Kết quả" />
                </Steps>

                <Card title="Thông tin giao dịch" bordered>
                    <Row gutter={[16, 16]}>
                        <Col span={12}><Text strong>Tài khoản nguồn</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{fromAccount}</Text></Col>

                        <Col span={12}><Text strong>Tài khoản thụ hưởng</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{accountNumber}</Text></Col>

                        <Col span={12}><Text strong>Tên người thụ hưởng</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{fullName}</Text></Col>

                        <Col span={12}><Text strong>Ngân hàng thụ hưởng</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{bankName}</Text></Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={12}><Text strong>Số tiền</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{amount?.toLocaleString()} VND</Text></Col>

                        <Col span={12}><Text strong>Phí giao dịch</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{fee.toLocaleString()} VND</Text></Col>
                    </Row>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={12}><Text strong>Ngày giao dịch</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{transactionDate}</Text></Col>

                        <Col span={12}><Text strong>Nội dung giao dịch</Text></Col>
                        <Col span={12} style={{ textAlign: "right" }}><Text>{note}</Text></Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col>
                            <Card title="Xác nhận OTP" bordered style={{ marginTop: 20 }}>
                                <Text>OTP đã gửi tới email: <strong>{customer?.email}</strong></Text>
                                <Form style={{ marginTop: 20 }}>
                                    <Form.Item>
                                        <Input
                                            placeholder="Nhập OTP"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            style={{ width: "200px", textAlign: "center" }}
                                        />
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Row gutter={16} justify="center" style={{ marginTop: 20 }}>
                    <Col>
                        <Button type="default" onClick={() => navigate(-1)}>Quay lại</Button>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={handleConfirm} loading={loading}>
                            Xác nhận giao dịch
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default TransactionConfirmation;