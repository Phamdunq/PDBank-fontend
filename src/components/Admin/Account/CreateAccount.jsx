import { Form, Input, Modal, notification, Select } from 'antd';
import { createAccountAPI } from '../../../services/AccountService';

const CreateAccount = ({ isCreateOpen, setIsCreateOpen, loadAccount }) => {
    const { Option } = Select
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsCreateOpen(false);
    };

    const handelSubmitButton = async (values) => {
        const res = await createAccountAPI(values)
        if (res.data) {
            setIsCreateOpen(false)
            await loadAccount()
            form.resetFields();
            notification.success({
                message: "Tạo tài khoản",
                description: "Tạo mới tài khoản thành công"
            })
        } else {
            notification.error({
                message: "Lỗi tạo tài khoản",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Modal
                title="Tạo tài khoản"
                open={isCreateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="create_account_form"
                    onFinish={handelSubmitButton}
                >
                    <Form.Item
                        name="accountNumber"
                        label="Số Tài Khoản"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                    >
                        <Input />
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
    );
};

export default CreateAccount;
