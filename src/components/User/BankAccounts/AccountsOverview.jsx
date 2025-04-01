import { Layout, Card, Typography, Row, Button, List, Collapse, Space, Divider } from "antd";
import { SyncOutlined, PlusOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import BreadcrumbNav from "../BreadcrumbNav";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const AccountsOverview = () => {
    const [activeKey, setActiveKey] = useState([]);
    const navigate = useNavigate();
    const { accounts } = useAuth();

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

    return (
        <Layout>
            <Content style={{ padding: 20 }}>
                <BreadcrumbNav items={[{ label: "Trang chủ", path: "/user", icon: true }, { label: "Tài khoản" }]} />

                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Row justify="space-between" align="middle">
                        <Title level={3}>Tài khoản của bạn</Title>
                        <Button icon={<SyncOutlined />}>Làm mới</Button>
                    </Row>

                    <Collapse
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        expandIconPosition="end"
                        expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <RightOutlined />)}
                        bordered={false}
                    >
                        <Panel header={<Text strong>Tài khoản thanh toán ({accounts.length})</Text>} key="1">
                            <List
                                dataSource={accounts}
                                renderItem={(item) => (
                                    <List.Item
                                        onClick={() => navigate(`/user/list/${item.accountNumber}`)}
                                        style={{ cursor: "pointer" }}
                                        actions={[<RightOutlined />]}
                                    >
                                        <List.Item.Meta
                                            title={<Text strong>{item.accountNumber}</Text>}
                                            description={item.bank}
                                        />
                                        <Text strong>{formatCurrency(item.balance)}</Text>
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>

                    <Card title={<Text strong>Tài khoản nhóm</Text>}>
                        <Text type="secondary">Không có tài khoản nào</Text>
                    </Card>

                    <Card title={<Text strong>Tài khoản tiết kiệm</Text>} extra={<Button icon={<PlusOutlined />} type="primary">Mở tài khoản</Button>}>
                        <Text type="secondary">Không có tài khoản nào</Text>
                    </Card>
                </Space>
            </Content>
        </Layout>
    );
};

export default AccountsOverview;
