import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sider = () => {
    const { Sider } = Layout;
    const [current, setCurrent] = useState("home"); // Mặc định chọn "home"

    // Xử lý sự kiện khi nhấn vào item trong Menu
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to="/admin/dashboard">Dashboard</Link>,
            key: "dashboard",
            icon: <DashboardOutlined />,
        },
        // {
        //     label: <Link to="/admin/account">account</Link>,
        //     key: "admin-account",
        //     icon: <HomeOutlined />,
        // },
        {
            label: "Quản lý",
            key: "admin",
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to="/admin/account">Quản lý tài khoản</Link>,
                    key: "admin-account",
                    // icon: <AccountBookOutlined />,
                },
                {
                    label: <Link to="/admin/customer">Quản lý khách hàng</Link>,
                    key: "admin-customer",
                    // icon: <HomeOutlined />,
                },
                {
                    label: <Link to="/admin/transaction">Quản lý giao dịch</Link>,
                    key: "admin-transaction",
                    // icon: <HomeOutlined />,
                },
                {
                    label: <Link to="/admin/user">Quản lý người dùng</Link>,
                    key: "admin-user",
                    // icon: <HomeOutlined />,
                },
                // {
                //     label: <Link to="/admin/dashboard">Dashboard</Link>,
                //     key: "admin-haha",
                //     icon: <DashboardOutlined />,
                // }

            ]
        },
    ]
    return (
        <Sider
            width={240}
        >
            <Menu
                onClick={onClick}
                mode="inline"
                selectedKeys={[current]}
                style={{
                    height: '100%',
                }}
                items={items}
            />
        </Sider>
    )
}

export default Sider