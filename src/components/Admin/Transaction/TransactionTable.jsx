import { Button, Col, Flex, Input, notification, Popconfirm, Row, Space, Table, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
    deleteMultipleTransactionAPI, deleteTransactionAPI,
    fetchAllTransactionApi
} from '../../../services/transactionService'
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import CreateTransaction from './CreateTransaction';
import DetailTransaction from './DetailTransaction';

const { Title } = Typography

const TransactionTable = () => {
    const [dataTransaction, setDataTransaction] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Trạng thái cho bộ lọc
    const [showFilter, setShowFilter] = useState(false);
    const [searchTransactionNumber, setSearchTransactionNumber] = useState("");
    const [filterTransactionType, setFilterTransactionType] = useState("");

    const [tempSearchTransactionNumber, setTempSearchTransactionNumber] = useState("");
    const [tempFilterTransactionType, setTempFilterTransactionType] = useState("");

    // Load dữ liệu tài khoản từ API
    const loadTransaction = useCallback(async () => {
        setLoadingTable(true);
        try {
            const res = await fetchAllTransactionApi(limit, page);
            console.log("check data:", res.data.data)
            if (res.data) {
                setDataTransaction(res.data.data)
                setTotal(res.data.total)
            }
        } catch (error) {
            console.error("Error loading accounts:", error);
        }
        setLoadingTable(false);
    }, [limit, page]);

    useEffect(() => {
        loadTransaction();
    }, [loadTransaction]);

    // Hàm xử lý khi xóa giao dịch
    const handleDeleteTransaction = async (id) => {
        const res = await deleteTransactionAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa giao dịch",
                description: "giao dịch đã được xóa thành công"
            });
            await loadTransaction(); // Tải lại dữ liệu sau khi xóa
        } else {
            notification.error({
                message: "Lỗi khi xóa giao dịch",
                description: JSON.stringify(res.message),
            });
        }
    };
    const handleDeleteMultipleTransaction = async () => {
        const res = await deleteMultipleTransactionAPI(selectedRowKeys);
        if (res.data) {
            notification.success({
                message: "Xóa nhiều giao dịch",
                description: "Các giao dịch đã được xóa thành công"
            });
            await loadTransaction();
            setSelectedRowKeys([]);
        } else {
            notification.error({
                message: "Lỗi khi xóa giao dịch",
                description: JSON.stringify(res.message),
            });
        }
    }

    // Xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        setSearchTransactionNumber(tempSearchTransactionNumber);
        setFilterTransactionType(tempFilterTransactionType);
        setPage(1); // Reset về trang đầu tiên
    };

    const handleResetFilter = () => {
        setTempSearchTransactionNumber("");  // Xóa nội dung ô nhập số tài khoản
        setTempFilterTransactionType("");    // Xóa nội dung select loại tài khoản
        setSearchTransactionNumber("");      // Xóa bộ lọc thực sự để gọi API
        setFilterTransactionType("");        // Xóa bộ lọc thực sự để gọi API
        setPage(1);                      // Reset về trang đầu tiên
    };
    // Hàm xử lý khi phân trang
    const onPaginationChange = (pagination) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
    };
    // Hàm xử lý khi chọn hoặc bỏ chọn hàng
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    //Cấu hình rowSelection cho bảng
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'ID account',
            dataIndex: 'accountId',
            key: 'accountId'
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'transactionType',
            key: 'transactionType',

        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) =>
                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount),
        },
        {
            title: 'Số tài khoản gửi',
            dataIndex: 'fromAccount',
            key: 'fromAccount',
        },
        {
            title: 'Số tài khoản nhận',
            dataIndex: 'toAccount',
            key: 'toAccount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <EyeOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateOpen(true);
                        }} /> */}
                    <EditOutlined
                        onClick={() => {
                            setSelectedTransaction(record);
                            setIsModalDetailOpen(true);
                        }}
                    />

                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tài khoản này?"
                        onConfirm={() => handleDeleteTransaction(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        }
    ];
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <>
            <Flex gap="middle" vertical>
                <Flex align="center" gap="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Row justify="space-between" align="middle" style={{ width: "100%" }}>
                        <Col>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<FilterOutlined />}
                                    onClick={() => setShowFilter(!showFilter)}
                                >
                                    Bộ lọc
                                </Button>

                                <Button
                                    type="primary"
                                    onClick={handleDeleteMultipleTransaction}
                                    disabled={!hasSelected}
                                >
                                    Xóa
                                </Button>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                            </Space>
                        </Col>

                        <Col>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsCreateOpen(true)}
                            >
                                Tạo giao dịch
                            </Button>
                        </Col>
                    </Row>
                </Flex>
                {/* Hiển thị bộ lọc nếu showFilter = true */}
                {showFilter && (
                    <Flex gap="middle" align="center" style={{ marginBottom: 16 }}>
                        <Input
                            placeholder="Nhập số tài khoản"
                            value={tempSearchTransactionNumber}
                            onChange={(e) => setTempSearchTransactionNumber(e.target.value)}
                            style={{ width: 200 }}
                        />

                        {/* <Select
                            placeholder="Chọn loại tài khoản"
                            value={tempFilterAccountType}
                            onChange={(value) => setTempFilterAccountType(value)}
                            style={{ width: 200 }}
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="Thanh toán">Thanh toán</Option>
                            <Option value="Tiết kiệm">Tiết kiệm</Option>
                        </Select> */}
                        <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                        <Button onClick={handleResetFilter}>Bỏ lọc</Button>
                    </Flex>
                )}

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataTransaction}
                    rowKey="_id"
                    loading={loadingTable}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: total,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng cộng ${total} tài khoản`,
                    }}
                    onChange={onPaginationChange}
                />

                <CreateTransaction
                    isCreateOpen={isCreateOpen}
                    setIsCreateOpen={setIsCreateOpen}
                    loadTransaction={loadTransaction}
                />

                <DetailTransaction
                    isModalDetailOpen={isModalDetailOpen}
                    setIsModalDetailOpen={setIsModalDetailOpen}
                    selectedTransaction={selectedTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                />
                {/* <UpdateAccount
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    isUpdateOpen={isUpdateOpen}
                    setIsUpdateOpen={setIsUpdateOpen}
                    loadAccount={loadAccount}
                /> */}
            </Flex>
        </>
    );
};

export default TransactionTable;
