import { Drawer, Descriptions, Typography, Divider, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;


const DetailCustomer = ({ selectedCustomer,
    setSelectedCustomer,
    isModalDetailOpen,
    setIsModalDetailOpen }) => {


    const [preview, setPreview] = useState(null); // Xem trước hình ảnh mở 

    const handleOnChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateUserAvatar = () => {
        // Thực hiện cập nhật avatar cho người dùng
        // Đây chỉ là mẫu, logic cập nhật sẽ phụ thuộc vào backend của bạn
        console.log("Avatar updated");
    };
    return (
        <Drawer
            width={"45vw"}
            title={<Title level={4}>Thông tin khách hàng</Title>}
            onClose={() => {
                setSelectedCustomer(null);
                setIsModalDetailOpen(false);
            }}
            closable={false}
            open={isModalDetailOpen}
        >
            {selectedCustomer ? (
                <>
                    <Descriptions bordered column={1} size="middle">
                        {/* <Descriptions.Item label="ID">{selectedCustomer._id}</Descriptions.Item> */}
                        <Descriptions.Item label="Họ và Tên">{selectedCustomer.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{selectedCustomer.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{selectedCustomer.gender}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{selectedCustomer.address}</Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">{selectedCustomer.dateOfBirth}</Descriptions.Item>
                        <Descriptions.Item label="Căn cước công dân">{selectedCustomer.identityNumber}</Descriptions.Item>
                    </Descriptions>

                    <Divider orientation="left" style={{ marginTop: "20px" }}>Ảnh</Divider>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px"
                    }}>
                        <div style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            height: "120px",
                            width: "120px",
                            overflow: "hidden",
                        }}>
                            <img
                                src={preview || `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${selectedCustomer.profilePicture}`}
                                alt="avatar"
                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <Upload
                            showUploadList={false}
                            beforeUpload={(file) => {
                                handleOnChangeFile({ target: { files: [file] } });
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                        </Upload>
                    </div>

                    {preview && (
                        <>
                            <Divider />
                            <Button type="primary" onClick={handleUpdateUserAvatar}>
                                Lưu thay đổi
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <Typography.Text type="secondary">Không có dữ liệu</Typography.Text>
            )}
        </Drawer>
    )
}


export default DetailCustomer