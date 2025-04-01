import { Layout, Card, Row, Col, Table } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Dữ liệu giả lập
const stats = {
    totalCustomers: 1200,
    totalBalance: "50,000,000 USD",
    dailyTransactions: 320,
    newAccounts: 15,
    pendingTransactions: 8,
};

const transactionData = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 8000 },
    { name: "Mar", value: 6500 },
    { name: "Apr", value: 9000 },
];

const accountGrowthData = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1100 },
    { name: "Mar", value: 1150 },
    { name: "Apr", value: 1200 },
];

const transactionColumns = [
    { title: "Transaction ID", dataIndex: "id", key: "id" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
    { title: "Receiver", dataIndex: "receiver", key: "receiver" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
];

const transactions = [
    { id: "TX1234", sender: "Alice", receiver: "Bob", amount: "$500" },
    { id: "TX1235", sender: "Charlie", receiver: "David", amount: "$700" },
];

const DashboardTable = () => {
    const { Header, Content } = Layout;

    return (
        <>
            <Content>
                <Row gutter={16}>
                    {Object.entries(stats).map(([key, value]) => (
                        <Col span={4} key={key}>
                            <Card title={key.replace(/([A-Z])/g, " $1").trim()}>{value}</Card>
                        </Col>
                    ))}
                </Row>
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Card title="Khối lượng giao dịch theo thời gian">
                            <LineChart width={400} height={200} data={transactionData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Tăng trưởng tài khoản khách hàng">
                            <LineChart width={400} height={200} data={accountGrowthData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                            </LineChart>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Card title="Giao dịch gần đây">
                            <Table dataSource={transactions} columns={transactionColumns} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </>
    );
}

export default DashboardTable