import { Button, Card, Col, Flex, Input, notification, Popconfirm, Row, Select, Space, Table, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
    deleteAccountAPI, deleteMultipleAccountAPI,
    fetchAllAccountApi
} from '../../../services/AccountService';
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import CreateAccount from './CreateAccount';
import UpdateAccount from './UpdateAccount';
import DetailAccount from './detailAccount';

const { Option } = Select;
const { Title } = Typography

const AccountTable = () => {
    const [dataAccount, setDataAccount] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    // Trạng thái cho bộ lọc
    const [showFilter, setShowFilter] = useState(false);
    const [searchAccountNumber, setSearchAccountNumber] = useState("");
    const [filterAccountType, setFilterAccountType] = useState("");

    const [tempSearchAccountNumber, setTempSearchAccountNumber] = useState("");
    const [tempFilterAccountType, setTempFilterAccountType] = useState("");


    // Load dữ liệu tài khoản từ API
    const loadAccount = useCallback(async () => {
        setLoadingTable(true);
        const res = await fetchAllAccountApi(limit, page, searchAccountNumber, filterAccountType);
        if (res.data) {
            setDataAccount(res.data.data);
            setTotal(res.data.total);
        }
        setLoadingTable(false);
    }, [limit, page, searchAccountNumber, filterAccountType]);


    useEffect(() => {
        loadAccount();
    }, [loadAccount]);

    // Xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        setSearchAccountNumber(tempSearchAccountNumber);
        setFilterAccountType(tempFilterAccountType);
        setPage(1); // Reset về trang đầu tiên
    };

    const handleResetFilter = () => {
        setTempSearchAccountNumber("");  // Xóa nội dung ô nhập số tài khoản
        setTempFilterAccountType("");    // Xóa nội dung select loại tài khoản
        setSearchAccountNumber("");      // Xóa bộ lọc thực sự để gọi API
        setFilterAccountType("");        // Xóa bộ lọc thực sự để gọi API
        setPage(1);                      // Reset về trang đầu tiên
    };


    // Hàm xử lý khi xóa tài khoản
    const handleDeleteAccount = async (id) => {
        const res = await deleteAccountAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa tài khoản",
                description: "Tài khoản đã được xóa thành công"
            });
            await loadAccount(); // Tải lại dữ liệu sau khi xóa
        } else {
            notification.error({
                message: "Lỗi khi xóa tài khoản",
                description: JSON.stringify(res.message),
            });
        }
    };
    const handleDeleteMultipleAccount = async () => {
        const res = await deleteMultipleAccountAPI(selectedRowKeys);
        if (res.data) {
            notification.success({
                message: "Xóa nhiều tài khoản",
                description: "Các tài khoản đã được xóa thành công"
            });
            await loadAccount();
            setSelectedRowKeys([]);
        } else {
            notification.error({
                message: "Lỗi khi xóa tài khoản",
                description: JSON.stringify(res.message),
            });
        }
    }
    // Hàm xử lý khi phân trang
    const onPaginationChange = (pagination) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
    };

    // Hàm xử lý khi chọn hoặc bỏ chọn hàng
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    // Cấu hình rowSelection cho bảng
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        // {
        //     title: 'ID account',
        //     dataIndex: '_id',
        //     key: '_id',
        // },
        {
            title: 'Số tài khoản',
            dataIndex: 'accountNumber',
            key: 'accountNumber'
        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'accountType',
            key: 'accountType',
            filters: [
                {
                    text: 'Thanh toán',
                    value: 'Thanh toán',
                },
                {
                    text: 'Tiết kiệm',
                    value: 'Tiết kiệm',
                },
            ],
            onFilter: (value, record) => record.accountType.indexOf(value) === 0,
        },
        {
            title: 'Số dư',
            dataIndex: 'balance',
            key: 'balance',
            render: (balance) =>
                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(balance),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined
                        onClick={() => {
                            setSelectedAccount(record);
                            setIsModalDetailOpen(true);
                        }} />
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tài khoản này?"
                        onConfirm={() => handleDeleteAccount(record._id)}
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
                {/* <Title>Danh sách tài khoản</Title> */}
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
                                onClick={handleDeleteMultipleAccount}
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
                            Tạo Tài Khoản
                        </Button>
                    </Col>
                </Row>

                {/* Hiển thị bộ lọc nếu showFilter = true */}
                {showFilter && (
                    <Flex gap="middle" align="center" style={{ marginBottom: 16 }}>
                        <Input
                            placeholder="Nhập số tài khoản"
                            value={tempSearchAccountNumber}
                            onChange={(e) => setTempSearchAccountNumber(e.target.value)}
                            style={{ width: 200 }}
                        />

                        <Select
                            placeholder="Chọn loại tài khoản"
                            value={tempFilterAccountType}
                            onChange={(value) => setTempFilterAccountType(value)}
                            style={{ width: 200 }}
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="Thanh toán">Thanh toán</Option>
                            <Option value="Tiết kiệm">Tiết kiệm</Option>
                        </Select>
                        <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                        <Button onClick={handleResetFilter}>Bỏ lọc</Button>
                    </Flex>
                )}

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataAccount}
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

                <CreateAccount
                    isCreateOpen={isCreateOpen}
                    setIsCreateOpen={setIsCreateOpen}
                    loadAccount={loadAccount}
                />
                <UpdateAccount
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    isUpdateOpen={isUpdateOpen}
                    setIsUpdateOpen={setIsUpdateOpen}
                    loadAccount={loadAccount}
                />
                <DetailAccount
                    selectedAccount={selectedAccount}
                    setSelectedAccount={setSelectedAccount}
                    isModalDetailOpen={isModalDetailOpen}
                    setIsModalDetailOpen={setIsModalDetailOpen}
                />
            </Flex>
        </>
    );
};

export default AccountTable;
