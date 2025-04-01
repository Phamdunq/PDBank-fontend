
import { Button, Drawer, Typography, Descriptions } from "antd";
// import DataToBlockchain from "./dataToBlockchain";
import { useState } from "react";
import DataToBlockchain from "./DataToBlockchain";
const { Title, Text } = Typography;

const DetailTransaction = (props) => {
    const { isModalDetailOpen, setIsModalDetailOpen, selectedTransaction, setSelectedTransaction } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Drawer
                closable={false}
                onClose={() => {
                    setIsModalDetailOpen(false);
                    setSelectedTransaction(null);
                }}
                open={isModalDetailOpen}
                width="45vw"
                title={<Title level={4}>Thông tin giao dịch</Title>}
                footer={
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={() => { setIsModalOpen(true) }} >Lưu dữ liệu vào blockchain</Button>
                    </div>
                }
            >
                {selectedTransaction ? (
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label="ID">
                            {selectedTransaction._id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loại giao dịch">
                            {selectedTransaction.transactionType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản gửi">
                            {selectedTransaction.fromAccount}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản nhận">
                            {selectedTransaction.toAccount}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tiền">
                            <Text type="success">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(selectedTransaction.amount)}
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo giao dịch">
                            <Text>02/03/2024</Text>
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <Text type="secondary">Không có dữ liệu</Text>
                )}
            </Drawer>

            <DataToBlockchain
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedTransaction={selectedTransaction}
            />
        </>
    );
};

export default DetailTransaction;
