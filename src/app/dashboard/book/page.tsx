'use client'
import React, { useEffect, useState } from 'react';
import { Button, Image, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import axios from 'axios'
import dayjs from 'dayjs';
const { Option } = Select;
const COLUMNS = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        render: (text: string) => {
            return <Image
                width={50}
                src={text}
                alt=''
            />
        }
    },
    {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        render: (text: string)=>{
            return <Tooltip title={text} placement='topLeft'>
                {text}
            </Tooltip>
        }
    },
    {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (text:string)=> dayjs(text).format('YYYY-MM-DD')
    },
];
const dataSource = [
    {
        
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
         
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];
export default function Page() {
    const [form] = Form.useForm();
    const { push } = useRouter();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
        total: 0,
    });
    useEffect(() => {
        async function fetchData() {
            const res= await axios.get('https://mock.apifox.com/m1/2398938-0-default/api/books')
            const {data} = res.data
            console.log(data);
            setData(data)
            
        }
        fetchData();
    },[])
    const columns = [...COLUMNS,
    {
        title: '操作', key: "action", render: (_, record) => {
            return (<Space>
                <Button type='link' onClick={handleBookEdit}>编辑</Button>
                <Button type='link' danger>删除</Button>
            </Space>)
        }
    }
    ]
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleSearchFinish = (values) => {
        console.log(values);

    }
    const handleSearchReset = () => {
        console.log(form);

    }
    const handleBookEdit = () => {
        push('/dashboard/book/edit/id');
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        console.log(pagination);
        setPagination(pagination)
    }

    return (
        <>
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
                        <Form.Item name="name" label="名称" >
                            <Input placeholder='请输入...' />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="author" label="作者" >
                            <Input placeholder='请输入...' />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="category" label="分类" >
                            <Select
                                placeholder="请选择"
                                onChange={handleChange}
                                options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe', label: 'yiminghe' },
                                ]}
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
            />;
            </div>
            
        </>
    )
}