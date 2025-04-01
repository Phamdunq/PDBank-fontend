import { PhoneOutlined } from "@ant-design/icons"
import { Layout } from "antd"


const FooterUser = () => {
    const { Footer } = Layout
    return (
        <Footer style={{ textAlign: "center" }}>
            <p>Pdbank ©{new Date().getFullYear()}. All Rights Reserved.</p>
            <p><PhoneOutlined /> Hotline: 0359206185</p>
        </Footer>
    )
}

export default FooterUser