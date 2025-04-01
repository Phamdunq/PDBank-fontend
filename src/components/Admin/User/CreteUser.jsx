import { Form, Input, Modal, notification, Select } from 'antd';
import { createUserAPI } from '../../../services/userService';
// import { createAccountAPI } from '../../../services/AccountService';

const CreateUser = ({ isCreateOpen, setIsCreateOpen, loadUser }) => {
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
        const res = await createUserAPI(values)
        if (res.data) {
            setIsCreateOpen(false)
            await loadUser()
            form.resetFields();
            notification.success({
                message: "Tạo user mới",
                description: "Tạo mới người dùng thành công"
            })
        } else {
            notification.error({
                message: "Lỗi tạo người dùng",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <>
            <Modal
                title="Tạo người dùng"
                open={isCreateOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="create_user_form"
                    onFinish={handelSubmitButton}
                >
                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Quyền"
                        rules={[{ required: true, message: 'Vui lòng chọn loại quyền!' }]}
                    >
                        <Select placeholder="Chọn loại quyền">
                            <Option value="admin">admin</Option>
                            <Option value="user">user</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUser;
