

import { Form, Input, message, Modal, notification } from "antd"
import { useContext, useState } from "react"
// import { AuthContext } from "../../context/auth.context"
// import { pushTransactionToBlockChain } from "../../services/api.services"

const DataToBlockchain = ({ isModalOpen, setIsModalOpen, selectedTransaction }) => {
    const [form] = Form.useForm();
    // const { customer } = useContext(AuthContext);

    // State để lưu trữ giá trị certificate và privateKey đã thay thế
    const [formattedCertificate, setFormattedCertificate] = useState('');
    const [formattedPrivateKey, setFormattedPrivateKey] = useState('');

    // Xử lý thay đổi giá trị trong form
    const onValuesChange = (changedValues) => {
        if (changedValues.certificate) {
            setFormattedCertificate(changedValues.certificate.replace(/\n/g, '\\n'));
        }
        if (changedValues.privateKey) {
            setFormattedPrivateKey(changedValues.privateKey.replace(/\n/g, '\\n'));
        }
    };

    const handelSubmitButton = async () => {
        message.success("Dữ liệu đã được đẩy lên Blockchain thành công!")
        setIsModalOpen(false);
        // console.log("check data: ", selectedTransaction)
        // const idSignature = customer.id;
        // console.log("certificate:", formattedCertificate)
        // console.log("privateKey:", formattedPrivateKey)
        // const signature = {
        //     "credentials": {
        //         "certificate": formattedCertificate,
        //         "privateKey": formattedPrivateKey
        //     },
        //     "mspId": "Org1MSP",
        //     "type": "X.509"
        // }

        // // const signature = {
        // //     "credentials": {
        // //         "certificate": "-----BEGIN CERTIFICATE-----\nMIICpjCCAkygAwIBAgIUdhQVEr8EC0zTCzJmWMXVW07w5/8wCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQxMTExMDU1MjAwWhcNMjUxMTExMDYxMzAw\nWjBVMTAwCwYDVQQLEwRvcmcxMA0GA1UECxMGY2xpZW50MBIGA1UECxMLZGVwYXJ0\nbWVudDExITAfBgNVBAMTGDY3MzA5OGY0NjVlMmI5NjhhODJiMmIzNTBZMBMGByqG\nSM49AgEGCCqGSM49AwEHA0IABPtjEnZ+sghgXopML6nycIyyL3SDr4FKZ+dnhsAv\nfCBaOeqojZtnplFXdMNnXbsFYasDU/n8ai49v9XiXOAUrXGjgd4wgdswDgYDVR0P\nAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFB2T2Qf8rzhooLAA/lrE\nkaROkrr9MB8GA1UdIwQYMBaAFB3fzJHJIl8mvDctPGaIKwFxqMy7MHsGCCoDBAUG\nBwgBBG97ImF0dHJzIjp7ImhmLkFmZmlsaWF0aW9uIjoib3JnMS5kZXBhcnRtZW50\nMSIsImhmLkVucm9sbG1lbnRJRCI6IjY3MzA5OGY0NjVlMmI5NjhhODJiMmIzNSIs\nImhmLlR5cGUiOiJjbGllbnQifX0wCgYIKoZIzj0EAwIDSAAwRQIhANDS0e53Ju7w\nmby8MSdDpwyHhqtKJWlSQ8YsnzSz5/OAAiApYh2t/ua+f8LOJjIesP8ZmZwE7GvD\nSo7AeGPPYm9dVg==\n-----END CERTIFICATE-----\n",
        // //         "privateKey": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgWSZ2bGuSnJE7z4ag\r\ni76rR5YE0qZf9ePVvUQV3oRbR4ehRANCAAT7YxJ2frIIYF6KTC+p8nCMsi90g6+B\r\nSmfnZ4bAL3wgWjnqqI2bZ6ZRV3TDZ127BWGrA1P5/GouPb/V4lzgFK1x\r\n-----END PRIVATE KEY-----\r\n"
        // //     },
        // //     "mspId": "Org1MSP",
        // //     "type": "X.509"
        // // }



        // console.log("signatuer:", signature)

        // // Đẩy dữ liệu lên blockchain
        // const response = await pushTransactionToBlockChain(
        //     idSignature,
        //     signature,
        //     selectedTransaction._id,
        //     selectedTransaction.transactionType,
        //     selectedTransaction.amount,
        //     selectedTransaction.currency,
        //     selectedTransaction.fromAccount,
        //     selectedTransaction.toAccount,
        //     selectedTransaction.createdAt
        // );
        // if (response) {
        //     console.log("checK:", response.data)
        //     // Thông báo thành công
        //     notification.success({ message: "Dữ liệu đã được đẩy lên blockchain thành công!" });
        //     form.resetFields();
        //     setIsModalOpen(false);
        // }
    }

    return (
        <>
            <Modal
                title="Nhập khóa"
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    form.resetFields(); // Reset form khi nhấn Cancel
                    setIsModalOpen(false); // Đóng modal khi nhấn Cancel
                }
                }
                closable={false}
            >
                <Form
                    form={form}
                    onFinish={handelSubmitButton} // Hàm gọi khi submit form thành công
                    layout="vertical"
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label="Khóa công khai (Certificate)"
                        name="certificate"  // Đặt tên cho trường input để dễ dàng truy cập nếu cần
                        rules={[{ required: true, message: 'Vui lòng nhập khóa công khai!' }]}
                    >
                        <Input
                            // value={certificate}
                            // onChange={(e) => setCertificate(e.target.value)} // Cập nhật state khi thay đổi
                            placeholder="Nhập khóa công khai"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Khóa bí mật (Private Key)"
                        name="privateKey"  // Đặt tên cho trường input để dễ dàng truy cập nếu cần
                        rules={[{ required: true, message: 'Vui lòng nhập khóa bí mật!' }]}
                    >
                        <Input
                            // value={privateKey} // Gán giá trị của khóa bí mật vào input
                            // onChange={(e) => setPrivateKey(e.target.value)} // Cập nhật state khi thay đổi
                            placeholder="Nhập khóa bí mật"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DataToBlockchain