import { Layout, Button, Card, Row, Col, Input, Tabs, List } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BreadcrumbNav from "../BreadcrumbNav";
import { fetchAllAccountByCustomerApi } from "../../../services/AccountService";

const { Content } = Layout;
const { TabPane } = Tabs;

const MoneyTransfer = () => {
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState("");
    const [accountInfo, setAccountInfo] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false); // Trạng thái để bật nút "Tiếp tục"

    // Xử lý khi nhấn "Kiểm tra"
    const handleCheckAccount = async () => {
        setError("");
        setAccountInfo(null);
        setIsValid(false);

        if (!accountNumber.trim()) {
            setError("Vui lòng nhập số tài khoản!");
            return;
        }

        setLoading(true);
        const res = await fetchAllAccountByCustomerApi();
        if (res && res.data) {
            const foundAccount = res.data.find(acc => acc.accountNumber === accountNumber);
            if (foundAccount) {
                setAccountInfo(foundAccount);
                setIsValid(true); // Bật nút "Tiếp tục"
            } else {
                setError("Số tài khoản không tồn tại!");
            }
        }
        setLoading(false);
    };

    // Xử lý khi nhấn "Tiếp tục"
    const handleContinue = () => {
        if (!isValid) return; // Chỉ tiếp tục khi tài khoản hợp lệ

        navigate("/user/transfer/form", {
            state: {
                fullName: accountInfo.customerId.fullName,
                accountNumber: accountInfo.accountNumber
            }
        });
    };

    return (
        <Layout>
            <Content style={{ padding: "20px", minHeight: "100vh" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Chuyển tiền" }
                    ]}
                />

                <Row gutter={[24, 24]} justify="center" align="top">
                    {/* Cột bên trái: Form nhập thông tin */}
                    <Col xs={24} md={12}>
                        <Card>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Nội bộ BIDV" key="1" />
                                <TabPane tab="Ngoài BIDV đến tài khoản" key="2" />
                                <TabPane tab="Ngoài BIDV đến số thẻ" key="3" />
                            </Tabs>
                        </Card>

                        <Card style={{ marginTop: "20px" }}>
                            <Row gutter={[16, 16]} align="middle">
                                <Col flex="75%">
                                    <Input
                                        placeholder="Số tài khoản thụ hưởng"
                                        value={accountNumber}
                                        onChange={(e) => {
                                            setAccountNumber(e.target.value);
                                            setError("");
                                            setAccountInfo(null);
                                            setIsValid(false);
                                        }}
                                    />
                                </Col>
                                <Col flex="25%">
                                    <Button
                                        onClick={handleCheckAccount}
                                        loading={loading}
                                        style={{ width: "100%", minWidth: "100px" }}
                                    >
                                        Kiểm tra
                                    </Button>
                                </Col>
                            </Row>

                            {/* Hiển thị lỗi nếu có */}
                            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                            {/* Hiển thị thông tin tài khoản nếu hợp lệ */}
                            {accountInfo && (
                                <p style={{ marginTop: "10px", color: "green" }}>
                                    Chủ tài khoản: <strong>{accountInfo.customerId.fullName}</strong>
                                </p>
                            )}

                            {/* Nút Tiếp tục chỉ bật khi tài khoản hợp lệ */}
                            <Button
                                type="primary"
                                onClick={handleContinue}
                                block
                                style={{ marginTop: "16px" }}
                                disabled={!isValid}
                            >
                                Tiếp tục
                            </Button>
                        </Card>
                    </Col>

                    {/* Cột bên phải: Danh bạ người thụ hưởng */}
                    <Col xs={24} md={12}>
                        <Card>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Danh bạ" key="1">
                                    <Input placeholder="Tìm kiếm Danh bạ" prefix={<SearchOutlined />} style={{ marginBottom: "10px" }} />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[
                                            { fullName: "HA ANH LINH", accountNumber: "501174573", bank: "PdBank" },
                                            { fullName: "TRUONG DI HONG DUC", accountNumber: "501068810", bank: "PdBank" },
                                        ]}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<UserOutlined />}
                                                    title={item.fullName}
                                                    description={`${item.accountNumber} - ${item.bank}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </TabPane>
                                <TabPane tab="Gần đây" key="2" />
                                <TabPane tab="Mẫu đã lưu" key="3" />
                            </Tabs>
                            <Button type="primary" block style={{ marginTop: "10px" }}>
                                Quản lý danh bạ & mẫu
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default MoneyTransfer;
