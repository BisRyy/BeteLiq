import { useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const Topnav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
        <Link href="/">App</Link>
      </Item>
      <Item key="/login" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
        <Link href="/login">Login</Link>
      </Item>
      <Item
        key="/register"
        onClick={(e) => setCurrent(e.key)}
        icon={<UserAddOutlined />}
      >
        <Link href="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Topnav;
