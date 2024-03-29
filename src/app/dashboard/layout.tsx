'use client'
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Dropdown, Space, message } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, ReadOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = AntdLayout;
import styles from './index.module.css'
import type { MenuProps } from 'antd';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';


const ITEMS = [
    {
        label: "图书管理",
        key: "book",
        //   role: USER_ROLE.USER,
        //   icon: <SnippetsOutlined />,
        children: [
            {
                label: "图书列表",
                key: "/dashboard/book",
                //   role: USER_ROLE.USER,
            },
            {
                label: "图书添加",
                key: "/dashboard/book/add",
                //   role: USER_ROLE.ADMIN,
            },
        ],
    },
    {
        label: "借阅管理",
        key: "borrow",
        //   role: USER_ROLE.USER,
        //   icon: <SolutionOutlined />,
        children: [
            {
                label: "借阅列表",
                key: "/dashboard/borrow",
                //   role: USER_ROLE.USER,
            },
            {
                label: "书籍借阅",
                key: "/dashboard/borrow/add",
                //   role: USER_ROLE.ADMIN,
            },
        ],
    },
    {
        label: "分类管理",
        key: "/category",
        //   icon: <ProfileOutlined />,
        //   role: USER_ROLE.ADMIN,
        children: [
            {
                label: "分类列表",
                key: "/dashboard/category",
                //   role: USER_ROLE.ADMIN,
            },
            {
                label: "分类添加",
                key: "/dashboard/category/add",
                //   role: USER_ROLE.ADMIN,
            },
        ]
    },
    {
        label: "用户管理",
        key: "user",
        icon: <UserOutlined />,
        //   role: USER_ROLE.ADMIN,
        children: [
            {
                label: "用户列表",
                key: "/dashboard/user",
                //   role: USER_ROLE.ADMIN,
            },
            {
                label: "用户添加",
                key: "/dashboard/user/add",
                //   role: USER_ROLE.ADMIN,
            },
        ],
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { push } = useRouter()
    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        push(`${key}`)
    }
    const activeMenu = usePathname();
    const USER_ITEMS: MenuProps['items'] = [
        {
            key: "1",
            label: <Link href="user">用户中心</Link>,
          },
          {
            key: "2",
            label: (
              <span
                onClick={() => {
                  push("/login");
                  message.success("退出成功")
                }}
              >
                退出
              </span>
            ),
          },
      ];
    return (
        <AntdLayout className={styles.sectionInner}>
            <Header className={styles.header}>
                <ReadOutlined />
                <span className={styles.title}>图书管理系统</span>
                <span className={styles.user}>
                    <Dropdown menu={{items:USER_ITEMS}}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                </span>
                
            </Header>
            <AntdLayout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['/dashboard/book']}
                        defaultOpenKeys={['book']}
                        selectedKeys={[activeMenu]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={ITEMS}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <AntdLayout style={{ padding: '24px 24px' }}>
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 280,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div style={{height:'100%'}}>{children}</div>
                    </Content>
                </AntdLayout>
            </AntdLayout>
        </AntdLayout>
    );
}