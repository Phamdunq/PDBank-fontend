import { Layout } from "antd"

const Footer = () => {
    const { Footer } = Layout
    return (
        <Footer
            style={{
                textAlign: 'center',
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                padding: 10
            }}
        >
            Pdbank ©{new Date().getFullYear()} Ngân hàng thương mại
        </Footer>
    )
}

export default Footer