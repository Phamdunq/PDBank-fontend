import { Form, Input, Modal, notification, Select } from 'antd';
import { createTransactionApi } from '../../../services/transactionService';

const CreateTransaction = ({ isCreateOpen, setIsCreateOpen, loadTransaction }) => {
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
        const res = await createTransactionApi(values)
        if (res.data) {
            setIsCreateOpen(false)
            await loadTransaction()
            form.resetFields();
            notification.success({
                message: "Tạo giao dịch",
                description: "Tạo mới giao dịch thành công"
            })
        } else {
            notification.error({
                message: "Lỗi tạo giao dịch",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Modal
                title="Tạo giao dịch"
                open={isCreateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="create_transaction_form"
                    onFinish={handelSubmitButton}
                >
                    <Form.Item
                        name="transactionType"
                        label="Loại giao dịch"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                    >
                        <Select placeholder="Chọn loại giao dịch">
                            <Option value="Chuyển khoản">Chuyển khoản</Option>
                            <Option value="gửi tiết kiệm">Gửi tiết kiệm</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Số tiền"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fromAccount"
                        label="Số tài khoản gửi"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản gửi!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="toAccount"
                        label="Số tài khoản nhận"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản nhận!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateTransaction