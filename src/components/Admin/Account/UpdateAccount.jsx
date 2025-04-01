
import { Form, Input, Modal, notification, Select } from 'antd'
import { updateAccountAPI } from '../../../services/AccountService';
import { useEffect } from 'react';
const UpdateAccount = ({ dataUpdate, setDataUpdate, isUpdateOpen, setIsUpdateOpen, loadAccount }) => {
    const [form] = Form.useForm()
    const { Option } = Select

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                accountNumber: dataUpdate.accountNumber,
                accountType: dataUpdate.accountType,
                balance: dataUpdate.balance,
            })
        }
    }, [dataUpdate, form])

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        form.resetFields()
        setDataUpdate(null)
        setIsUpdateOpen(false);
    };

    const handelSubmitButton = async (values) => {
        const res = await updateAccountAPI(values)
        if (res.data) {
            setIsUpdateOpen(false)
            await loadAccount()
            form.resetFields();
            notification.success({
                message: "Cập nhật tài khoản",
                description: "Cập nhật tài khoản thành công"
            })
        } else {
            notification.error({
                message: "Lỗi khi cập nhật tài khoản",
                description: JSON.stringify(res.message)
            });
        }


    }
    return (
        <>
            <Modal title="Cập nhật tài khoản"
                open={isUpdateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" name="create_account_form"
                    onFinish={handelSubmitButton}

                >
                    <Form.Item
                        name="id"
                        label="Id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="accountNumber"
                        label="Số Tài Khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="accountType"
                        label="Loại Tài Khoản"
                        rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
                    >
                        <Select placeholder="Chọn loại tài khoản">
                            <Option value="Thanh toán">Thanh toán</Option>
                            <Option value="Tiết kiệm">Tiết kiệm</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="balance"
                        label="Số Dư"
                        rules={[{ required: true, message: 'Vui lòng nhập số dư!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateAccount