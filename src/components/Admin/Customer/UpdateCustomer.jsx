import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd"
import { useEffect } from "react"
import { updateCustomerAPI } from "../../../services/customerService"
import dayjs from "dayjs"

const UpdateCustomer = ({ dataUpdate, setDataUpdate, isUpdateOpen, setIsUpdateOpen, loadCustomer }) => {
    const [form] = Form.useForm()
    const { Option } = Select

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                fullName: dataUpdate.fullName,
                email: dataUpdate.email,
                phoneNumber: dataUpdate.phoneNumber,
                address: dataUpdate.address,
                gender: dataUpdate.gender,
                identityNumber: dataUpdate.identityNumber,
                dateOfBirth: dataUpdate.dateOfBirth ? dayjs(dataUpdate.dateOfBirth) : null, // Chuyển đổi thành dayjs
                profilePicture: dataUpdate.profilePicture
            })
        }
    }, [dataUpdate, form])

    const handelSubmitButton = async (values) => {
        const payload = {
            ...values,
            dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null // Định dạng lại ngày tháng trước khi gửi API
        };

        const res = await updateCustomerAPI(payload);
        if (res.data) {
            setIsUpdateOpen(false)
            await loadCustomer()
            form.resetFields();
            notification.success({
                message: "Cập nhật thông tin khách hàng",
                description: "Cập nhật thông tin khách hàng thành công"
            })
        } else {
            notification.error({
                message: "Lỗi khi cập nhật thông tin khách hàng",
                description: JSON.stringify(res.message)
            });
        }
    }

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        form.resetFields()
        setDataUpdate(null)
        setIsUpdateOpen(false);
    };

    return (
        <>
            <Modal title="Cập nhật khách hàng"
                open={isUpdateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" name="create_account_form"
                    onFinish={handelSubmitButton}

                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Id customer"
                                name="id"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Tên khách hàng"
                                name="fullName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Cột 2 */}
                        <Col span={12}>
                            <Form.Item
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
                            </Form.Item>
                            <Form.Item
                                label="Ngày sinh"
                                name="dateOfBirth"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                            >
                                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                            {/* <Form.Item
                                label="ảnh chưa có"
                                name="profilePicture"
                            // rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item> */}
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateCustomer