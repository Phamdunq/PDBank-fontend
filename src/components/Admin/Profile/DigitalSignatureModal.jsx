

import { useState } from "react";
import { Modal, Button, Form, Input, Typography, Col, Row, message } from "antd";

const { Text } = Typography;

const DigitalSignatureModal = ({ isModalOpen, setIsModalOpen }) => {
    const [form] = Form.useForm();

    // Xử lý đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields(); // Reset form khi đóng modal
    };

    // Xử lý xác nhận nhập mật khẩu
    const handleConfirm = () => {
        form.validateFields()
            .then((values) => {
                console.log("Mật khẩu xác nhận:", values.password);
                message.success("Tạo chữ ký số thành công!")
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch((info) => {
                console.log("Lỗi khi nhập mật khẩu:", info);
            });
    };

    const handleCreateCtx = async () => {
        alert("thành công")
        // // const res = await taoKhoaNguoiDung(customer.id);
        // console.log("check :", res.data)
        // if (res.data) {
        //     setCertificate(res.data.credentials.certificate);
        //     setPrivateKey(res.data.credentials.privateKey);
        //     form.setFieldsValue({
        //         certificate: res.data.credentials.certificate,
        //         privateKey: res.data.credentials.privateKey,
        //     });
        //     notification.success({
        //         message: "Tạo khóa thành công",
        //     });
        // }
    };

    return (
        <>

            {/* Modal nhập mật khẩu */}
            <Modal
                title="Nhập mật khẩu"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
                width={500}
            >
                <Text>
                    Vui lòng nhập mật khẩu đăng nhập xác nhận tạo chữ ký số
                </Text>

                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: 16 }}
                >
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                </Form>
                <Row justify="center" gutter={16}>
                    <Col>
                        <Button onClick={handleCancel}>
                            Hủy bỏ
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={handleConfirm} >
                            Tiếp theo
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default DigitalSignatureModal;
