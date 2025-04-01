import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Col, Flex, Input, notification, Popconfirm, Row, Select, Space, Table } from "antd"
import { useCallback, useEffect, useState } from "react"
import {
    deleteCustomerAPI,
    deleteMultipleCustomerAPI,
    fetchAllCustomerAPI
} from "../../../services/customerService"
import CreateCustomer from "./CreateCustomer"
import UpdateCustomer from "./UpdateCustomer"
import DetailCustomer from "./DetailCustomer"


const CustomerTable = () => {
    const [dataCustomer, setDataCustomer] = useState([])
    const [loadingTable, setLoadingTable] = useState(false)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    // Trạng thái cho bộ lọc
    const [showFilter, setShowFilter] = useState(false);
    const [searchCustomerNumber, setSearchCustomerNumber] = useState("");
    const [filterCustomerType, setFilterCustomerType] = useState("");

    const [tempSearchCustomerNumber, setTempSearchCustomerNumber] = useState("");
    const [tempFilterCustomerType, setTempFilterCustomerType] = useState("");

    //Load dữ liệu khách hàng từ API
    const loadCustomer = useCallback(async () => {
        setLoadingTable(true)
        try {
            const res = await fetchAllCustomerAPI(limit, page)
            if (res.data) {
                setDataCustomer(res.data.data)
                setTotal(res.data.total)
            }
        } catch (error) {
            console.error("Error loading customer:", error);
        }
        setLoadingTable(false)
    }, [limit, page])

    useEffect(() => {
        loadCustomer()
    }, [loadCustomer])

    const handleDeleteCustomer = async (id) => {
        const res = await deleteCustomerAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa khách hàng",
                description: "khách hàng đã được xóa thành công"
            });
            await loadCustomer(); // Tải lại dữ liệu sau khi xóa
        } else {
            notification.error({
                message: "Lỗi khi xóa khách hàng",
                description: JSON.stringify(res.message),
            });
        }
    }

    const handleDeleteMultipleCustomer = async () => {
        const res = await deleteMultipleCustomerAPI(selectedRowKeys)
        if (res.data) {
            notification.success({
                message: "Xóa nhiều khách hàng",
                description: "Các khách hàng đã được xóa thành công"
            });
            await loadCustomer()
            setSelectedRowKeys([])
        } else {
            notification.error({
                message: "Lỗi khi xóa khách hàng",
                description: JSON.stringify(res.message)
            })
        }
    }

    // Xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        setSearchCustomerNumber(tempSearchCustomerNumber);
        setFilterCustomerType(tempFilterCustomerType);
        setPage(1); // Reset về trang đầu tiên
    };

    const handleResetFilter = () => {
        setTempSearchCustomerNumber("");  // Xóa nội dung ô nhập số tài khoản
        setTempFilterCustomerType("");    // Xóa nội dung select loại tài khoản
        setSearchCustomerNumber("");      // Xóa bộ lọc thực sự để gọi API
        setFilterCustomerType("");        // Xóa bộ lọc thực sự để gọi API
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

    // Cấu hình rowSelection cho bảng
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
        // {
        //     title: 'ID customer',
        //     dataIndex: '_id',
        //     key: '_id',
        // },
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'Giới tính',
        //     dataIndex: 'gender',
        //     key: 'gender',
        // },
        // {
        //     title: 'CCCD',
        //     dataIndex: 'identityNumber',
        //     key: 'identityNumber',
        // },
        // {
        //     title: 'Ngày sinh',
        //     dataIndex: 'dateOfBirth',
        //     key: 'dateOfBirth',
        // },
        // {
        //     title: 'Ảnh',
        //     dataIndex: 'profilePicture',
        //     key: 'profilePicture',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined
                        onClick={() => {
                            setSelectedCustomer(record);
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
                        onConfirm={() => handleDeleteCustomer(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    return (
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
                                onClick={handleDeleteMultipleCustomer}
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
                            Tạo khách hàng
                        </Button>
                    </Col>
                </Row>

            </Flex>
            {/* Hiển thị bộ lọc nếu showFilter = true */}
            {showFilter && (
                <Flex gap="middle" align="center" style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Nhập tên khách hàng"
                        value={tempSearchCustomerNumber}
                        onChange={(e) => setTempSearchCustomerNumber(e.target.value)}
                        style={{ width: 200 }}
                    />

                    {/* <Select
                            placeholder="Chọn loại tài khoản"
                            value={tempFilterCustomerType}
                            onChange={(value) => setTempFilterCustomerType(value)}
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
                dataSource={dataCustomer}
                rowKey="_id"
                loading={loadingTable}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: total,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng cộng ${total} khách hàng`,
                }}
                onChange={onPaginationChange}
            />
            <CreateCustomer
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadCustomer={loadCustomer}
            />
            <UpdateCustomer
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                loadCustomer={loadCustomer}
            />
            <DetailCustomer
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
            />
        </Flex>
    )
}

export default CustomerTable