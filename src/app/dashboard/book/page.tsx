'use client'
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Space, Table } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;
const COLUMNS = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '封面',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '分类',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '作者',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '描述',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '库存',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '创建时间',
        dataIndex: 'address',
        key: 'address',
    },
];
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];
export default function Page() {
    const [form] = Form.useForm();
    const { push } = useRouter();
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
    const columns = [...COLUMNS,
    {
        title: '操作', key: "action", dataIndex: "", render: (_, row) => {
            <>
                <Button type='link' onClick={handleBookEdit}>编辑</Button>
                <Button type='link' danger>删除</Button>
            </>
        }
    }
    ]
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
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} />;
        </>
    )
}