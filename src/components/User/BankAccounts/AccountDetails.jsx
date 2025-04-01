import { Layout, Table, Card, Typography, Button, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import BreadcrumbNav from "../BreadcrumbNav";
import { useAuth } from "../../../contexts/AuthContext";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const AccountDetails = () => {
    const { customer, transactions, accounts } = useAuth(); // Lấy dữ liệu từ context
    const defaultAccount = accounts?.[0]; // Lấy tài khoản đầu tiên làm mặc định

    const columns = [
        {
            title: "Ngày giao dịch",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Mã GD",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mô tả",
            dataIndex: "transactionType",
            key: "transactionType",
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount) =>
                <span style={{ color: "red" }}>
                    {amount >= 0
                        ? `-${amount.toLocaleString("vi-VN")} VND`
                        : `${amount.toLocaleString("vi-VN")} VND`}
                </span>
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ padding: "20px" }}>
                <BreadcrumbNav
                    items={[
                        { label: "Trang chủ", path: "/user", icon: true },
                        { label: "Tài khoản", path: "/user/list" },
                        { label: "Chi tiết" },
                    ]}
                />
                <Title level={3}>Chi tiết tài khoản thanh toán</Title>
                <Button icon={<DownloadOutlined />} type="primary" style={{ marginBottom: 16 }}>
                    Xuất Excel
                </Button>
                <Input placeholder="Tìm kiếm" style={{ width: 200, marginLeft: 10 }} />
                <Table columns={columns}
                    // dataSource={transactions} 
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                    dataSource={[...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                />
            </Content>
            <Sider width={300} style={{ background: "#f0f2f5", padding: "20px" }}>
                {/* <Sider width={300} style={{ background: "#f0f2f5", padding: "20px" }}>
                    {accounts?.map((account) => (
                        <Card key={account.accountNumber} style={{ marginBottom: 16 }}>
                            <Title level={5}>{account.accountNumber}</Title>
                            <Text strong>Loại tài khoản:</Text> <Text>{account.accountType}</Text>
                            <br />
                            <Text strong>Số dư:</Text> <Text>{account.balance.toLocaleString("vi-VN")} VND</Text>
                            <br />
                            <Button type="primary" block style={{ marginTop: 10 }}>
                                Chọn tài khoản này
                            </Button>
                        </Card>
                    ))}
                </Sider> */}

                <Card>
                    <Title level={4}>{customer?.accountNumber}</Title>
                    <Text strong>Tên chủ tài khoản:</Text> <Text>{customer?.fullName}</Text>
                    <br />
                    <Text strong>Số tài khoản:</Text> <Text>{defaultAccount?.accountNumber}</Text>
                    <br />
                    <Text strong>Loại tài khoản:</Text> <Text>{defaultAccount.accountType}</Text>
                    <br />
                    <Text strong>Ngày mở tài khoản:</Text> <Text>{defaultAccount?.createdAt ? new Date(customer.createdAt).toLocaleDateString("vi-VN") : "N/A"}</Text>
                    <br />
                    <Text strong>Số dư khả dụng:</Text> <Text>{defaultAccount?.balance?.toLocaleString("vi-VN")} VND</Text>
                    <Button type="primary" block style={{ marginTop: 16 }}>
                        Tài khoản mặc định
                    </Button>
                </Card>
            </Sider>
        </Layout>
    );
};

export default AccountDetails;