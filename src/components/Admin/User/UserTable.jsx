import { Button, Col, Flex, Input, notification, Popconfirm, Row, Select, Space, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteMultipleUserAPI, deleteUserAPI, fetchAllUserAPI } from '../../../services/userService';
import CreateUser from './CreteUser';
// import UpdateAccount from './UpdateAccount';
// import DetailAccount from './detailAccount';

const { Option } = Select;

const UserTable = () => {
    const [dataUser, setDataUser] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    // const [dataUpdate, setDataUpdate] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    // Trạng thái cho bộ lọc
    const [showFilter, setShowFilter] = useState(false);
    const [searchUserNumber, setSearchUserNumber] = useState("");
    const [filterUserType, setFilterUserType] = useState("");

    const [tempSearchUserNumber, setTempSearchUserNumber] = useState("");
    const [tempFilterUserType, setTempFilterUserType] = useState("");


    // Load dữ liệu user từ API
    const loadUser = useCallback(async () => {
        setLoadingTable(true);
        const res = await fetchAllUserAPI(limit, page);
        if (res.data) {
            setDataUser(res.data.data);
            setTotal(res.data.total);
        }
        setLoadingTable(false);
    }, [limit, page]);


    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // Xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        setSearchUserNumber(tempSearchUserNumber);
        setFilterUserType(tempFilterUserType);
        setPage(1); // Reset về trang đầu tiên
    };



    const handleResetFilter = () => {
        setTempSearchUserNumber("");  // Xóa nội dung ô nhập số tài khoản
        setTempFilterUserType("");    // Xóa nội dung select loại tài khoản
        setSearchUserNumber("");      // Xóa bộ lọc thực sự để gọi API
        setFilterUserType("");        // Xóa bộ lọc thực sự để gọi API
        setPage(1);                      // Reset về trang đầu tiên
    };


    // Hàm xử lý khi xóa tài khoản
    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa người dùng",
                description: "Người đã được xóa thành công"
            });
            await loadUser(); // Tải lại dữ liệu sau khi xóa
        } else {
            notification.error({
                message: "Lỗi khi xóa người dùng",
                description: JSON.stringify(res.message),
            });
        }
    };
    const handleDeleteMultipleUser = async () => {
        const res = await deleteMultipleUserAPI(selectedRowKeys);
        console.log("res:", res.data)
        if (res && res.data) {
            notification.success({
                message: "Xóa nhiều người dùng",
                description: "Các người dùng đã được xóa thành công"
            });
            await loadUser();
            setSelectedRowKeys([]);
        } else {
            notification.error({
                message: "Lỗi khi xóa người dùng",
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
        //     title: 'ID User',
        //     dataIndex: '_id',
        //     key: '_id',
        // },

        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <EyeOutlined
                        onClick={() => {
                            setSelectedUser(record);
                            setIsModalDetailOpen(true);
                        }} /> */}
                    {/* <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsUpdateOpen(true);
                        }}
                    /> */}
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tài khoản này?"
                        onConfirm={() => handleDeleteUser(record._id)}
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
                                    onClick={handleDeleteMultipleUser}
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
                                Tạo người dùng
                            </Button>
                        </Col>
                    </Row>
                </Flex>

                {/* Hiển thị bộ lọc nếu showFilter = true */}
                {showFilter && (
                    <Flex gap="middle" align="center" style={{ marginBottom: 16 }}>
                        <Input
                            placeholder="Nhập số tài khoản"
                            value={tempSearchUserNumber}
                            onChange={(e) => setTempSearchUserNumber(e.target.value)}
                            style={{ width: 200 }}
                        />

                        <Select
                            placeholder="Chọn loại tài khoản"
                            value={tempFilterUserType}
                            onChange={(value) => setTempFilterUserType(value)}
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
                    dataSource={dataUser}
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

                <CreateUser
                    isCreateOpen={isCreateOpen}
                    setIsCreateOpen={setIsCreateOpen}
                    loadUser={loadUser}
                />
                {/* <UpdateUser
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    isUpdateOpen={isUpdateOpen}
                    setIsUpdateOpen={setIsUpdateOpen}
                    loadUser={loadUser}
                />
                <DetailUser
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    isModalDetailOpen={isModalDetailOpen}
                    setIsModalDetailOpen={setIsModalDetailOpen}
                /> */}
            </Flex>
        </>
    );
};

export default UserTable;
