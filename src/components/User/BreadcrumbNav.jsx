import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BreadcrumbNav = ({ items }) => {
    const navigate = useNavigate();

    return (
        <Breadcrumb style={{ cursor: "pointer", marginBottom: "16px" }}>
            {items.map((item, index) => (
                <Breadcrumb.Item
                    key={index}
                    onClick={item.path ? () => navigate(item.path) : undefined}
                    style={{ cursor: item.path ? "pointer" : "default" }}
                >
                    {item.icon && <LeftOutlined />} {item.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default BreadcrumbNav;
