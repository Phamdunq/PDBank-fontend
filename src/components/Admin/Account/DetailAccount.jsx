import { Drawer, Descriptions, Typography, Divider, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/skeleton/Title";


const DetailAccount = ({ selectedAccount, setSelectedAccount, isModalDetailOpen, setIsModalDetailOpen }) => {
    // const [preview, setPreview] = useState(null);

    // const handleOnChangeFile = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => setPreview(reader.result);
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const handleUpdateUserAvatar = () => {
    //     // Thực hiện cập nhật avatar cho người dùng
    //     // Đây chỉ là mẫu, logic cập nhật sẽ phụ thuộc vào backend của bạn
    //     console.log("Avatar updated");
    // };
    return (
        <Drawer
            width={"45vw"}
            title={<Title level={4}>Thông tin Tài khoản</Title>}
            onClose={() => {
                setSelectedAccount(null);
                setIsModalDetailOpen(false);
            }}
            closable={false}
            open={isModalDetailOpen}
        >
            {selectedAccount ? (
                <>
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label="ID">{selectedAccount._id}</Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản">{selectedAccount.accountNumber}</Descriptions.Item>
                        <Descriptions.Item label="Loại tài khoản">{selectedAccount.accountType}</Descriptions.Item>
                        <Descriptions.Item label="Số dư">{selectedAccount.balance}</Descriptions.Item>

                    </Descriptions>

                    <Divider orientation="left" style={{ marginTop: "20px" }}>Thông tin chi tiết</Divider>

                    {/* <div style={{
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
                                src={preview || `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${selectedAccount.avatar}`}
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
                    )} */}
                </>
            ) : (
                <Typography.Text type="secondary">Không có dữ liệu</Typography.Text>
            )}
        </Drawer>
    )
}

export default DetailAccount