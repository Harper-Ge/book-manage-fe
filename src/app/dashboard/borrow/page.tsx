'use client'
import React, { useEffect, useState } from 'react';
import { Button, Image, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip, message, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs from 'dayjs';
import { getBookList } from '@/app/api/book';
import { borrowDelete, getBorrowList } from '@/app/api/borrow';
import Content from '@/app/components/Content';
import { BookQueryType, BookType, BorrowQueryType, CategoryType } from '@/app/type';
import { getCategoryList } from '@/app/api/category';
const COLUMNS = [
    {
        title: "书籍名称",
        dataIndex: "bookName",
        key: "bookName",
        ellipsis: true,
        width: 200,
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        ellipsis: true,
        width: 100,
        render: (text: string) =>
            text === "on" ? (
                <Tag color="red">借出</Tag>
            ) : (
                <Tag color="green">已还</Tag>
            ),
    },
    {
        title: "书籍作者",
        dataIndex: "author",
        key: "author",
        ellipsis: true,
        width: 150,
    },
    {
        title: "借阅人",
        dataIndex: "borrowUser",
        key: "borrowUser",
        ellipsis: true,
        width: 150,
    },
    {
        title: "借阅时间",
        dataIndex: "borrowAt",
        key: "borrowAt",
        width: 150,
        render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
        title: "归还时间",
        dataIndex: "backAt",
        key: "backAt",
        width: 150,
        render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "-"),
    },
];
const STATUS_OPTIONS = [{
    label: "借出",
    value: "on"
}, {
    label: "归还",
    value: "off"
}]
export default function Page() {
    const [form] = Form.useForm();
    const { push } = useRouter();
    const [data, setData] = useState([]);
    //todo
    const [userList, setUserList] = useState<any[]>([])
    const [catagoryList, setCategoryList] = useState<CategoryType[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
        total: 0,
    });
    const [bookList, setBookList] = useState<BookType[]>([]);
    async function fetchData(values?: BookQueryType) {
        const list = await getBorrowList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...values,
        })
        const newData = list.data.map((item) => ({
            ...item,
            bookName: item.book.name,
            borrowUser: item.user.nickName,
            author: item.book.author,
        }))
        console.log(newData);
        
        setData(newData);
        setPagination({
            ...pagination,
            total: list.total,
        })
    }
    useEffect(() => {
        fetchData();
        getBookList({ all: true }).then(res => {
            setBookList(res.data);
        })
        getCategoryList({ all: true }).then((res) => {
            setCategoryList(res.data);
        })
    }, [])

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleSearchFinish = async (values: BorrowQueryType) => {
        console.log(values);
        const res = await getBorrowList(values);
        const newData = res.data.map(item => ({
            ...item,
            bookName: item.book.name,
            borrowUser: item.user.nickname,

        }))
        console.log(newData);

        setData(newData);
        setPagination({ ...pagination, current: 1, total: res.total })


    }
    const handleSearchReset = () => {
        console.log(form);

    }
    const handleBorrowEdit = (id: string) => {
        push(`/dashboard/borrow/edit/${id}`);
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        console.log(pagination);
        setPagination(pagination);
    }
    const handleBorrowDelete = async (id: string) => {
        await bookDelete(id);
        message.success("删除成功");
        fetchData();
    }
    const columns = [...COLUMNS,
    {
        title: '操作', key: "action", render: (_: any, row: any) => {
            return (<Space>
                <Button type='link' onClick={() => handleBorrowEdit(row._id)}>编辑</Button>
                <Button type='link' danger
                    onClick={() => {
                        handleBorrowDelete(row._id)
                    }}
                >删除</Button>
            </Space>)
        }
    }
    ]
    return (
        <Content
            title={"借阅列表"}
            operation={<Button type='primary'
                onClick={() => push("/dashboard/borrow/add")}>添加</Button>}>
            <Form
                form={form}
                name="search"
                onFinish={handleSearchFinish}
                initialValues={{
                    price: {
                        number: 0,
                        currency: 'rmb',
                    },
                }}
            >
                <Row gutter={16}>
                    <Col span={5}>
                        <Form.Item name="name" label="书籍名称" >
                            <Select
                                allowClear
                                showSearch
                                optionFilterProp='label'
                                options={bookList.map(item => ({
                                    label: item.name,
                                    value: item._id
                                }))}></Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="author" label="状态" >
                            <Select allowClear options={STATUS_OPTIONS}></Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="user" label="借阅人" >
                            <Select
                                placeholder="请选择"
                                onChange={handleChange}
                                options={userList.map((item) => {
                                    return {
                                        label: item.name,
                                        value: item._id,
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                                <Button htmlType="submit" onClick={handleSearchReset}>
                                    清空
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className={styles.tableWrap}>
                <Table
                    dataSource={data}
                    columns={columns}
                    onChange={handleTableChange}
                    scroll={{ x: 1000 }}
                    pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
                />
            </div>

        </Content>
    )
}