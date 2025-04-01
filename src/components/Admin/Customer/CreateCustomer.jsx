import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd"
import { createCustomerAPI } from "../../../services/customerService";


const CreateCustomer = ({ isCreateOpen, setIsCreateOpen, loadCustomer }) => {
    // const { Option } = Select
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsCreateOpen(false);
    };

    const handelSubmitButton = async (values) => {
        const res = await createCustomerAPI(values)
        if (res.data) {
            setIsCreateOpen(false)
            await loadCustomer()
            form.resetFields();
            notification.success({
                message: "Tạo khách hàng",
                description: "Tạo mới khách hàng thành công"
            })
        } else {
            notification.error({
                message: "Lỗi tạo mới khách hàng",
                description: JSON.stringify(res.message)
            });
        }
    }

    return (
        <>
            <Modal
                title="Tạo khách hàng"
                open={isCreateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="create_account_form"
                    onFinish={handelSubmitButton}
                >

                    {/* <Form.Item
                        label="ID account"
                        name="_id"
                    // rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                    >
                        <Input />
                    </Form.Item> */}

                    <Row gutter={16}>
                        {/* Cột 1 */}
                        <Col span={12}>
                            {/* <Form.Item
                                label="ảnh chưa có"
                                name="profilePicture"
                            // rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item> */}
                            {/* Tên đầy đủ */}
                            <Form.Item
                                label="Tên khách hàng"
                                name="fullName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Email */}
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Số điện thoại */}
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Cột 2 */}
                        <Col span={12}>
                            {/* Địa chỉ */}
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Số CCCD"
                                name="identityNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}
                            >
                                <Input />
                            </Form.Item> */}
                            {/* Ngày sinh (sử dụng DatePicker) */}
                            <Form.Item
                                label="Ngày sinh"
                                name="dateOfBirth"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="YYYY-MM-DD"
                                    placeholder="Chọn ngày sinh"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default CreateCustomer