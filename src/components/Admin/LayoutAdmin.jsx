import { Breadcrumb, Layout, theme } from 'antd';
import Header from './Header'
// import Footer from '../Footer';
import Sider from './Sider'
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header />
            <Content
                style={{
                    padding: '18px 18px 18px 18px',
                }}
            >
                {/* <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Layout
                    style={{
                        padding: '24px 0px 0px 0px',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider />
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 457,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            {/* <Footer /> */}
        </Layout>
    );
};
export default App;