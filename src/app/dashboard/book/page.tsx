'use client'
import React, { useEffect, useState } from 'react';
import { Button, Image, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip, message } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs from 'dayjs';
import { bookDelete, getBookList } from '@/app/api/book';
import Content from '@/app/components/Content';
import { BookQueryType, CategoryType } from '@/app/type';
import { getCategoryList } from '@/app/api/category';
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

export default function Page() {
    const [form] = Form.useForm();
    const { push } = useRouter();
    const [data, setData] = useState([]);
    const [ catagoryList, setCategoryList] = useState<CategoryType[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
        total: 0,
    });
    async function fetchData(values?: BookQueryType) {
        const list = await getBookList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...values,
        })
        const {data} = list;
        console.log(data);
        
        setData(data);
        setPagination({
            ...pagination,
            total:list.total,
        })
    }
    useEffect(() => {
        fetchData();
        getCategoryList({all: true}).then((res) => {
            console.log('1',res);
            
            setCategoryList(res.data);  
        })
    }, [])
    const columns = [...COLUMNS,
    {
        title: '操作', key: "action", render: (_:any, row:any) => {
            return (<Space>
                <Button type='link' onClick={()=>handleBookEdit(row._id)}>编辑</Button>
                <Button type='link' danger
                onClick={() => {
                    handleBookDelete(row._id)
                }}
                >删除</Button>
            </Space>)
        }
    }
    ]
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleSearchFinish = async (values) => {
        console.log(values);
        const res = await getBookList(values);
        console.log(res);
        
        setData(res.data);
        setPagination({...pagination, current:1, total: res.total})


    }
    const handleSearchReset = () => {
        console.log(form);

    }
    const handleBookEdit = (id: string) => {
        push(`/dashboard/book/edit/${id}`);
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        console.log(pagination);
        setPagination(pagination);
    }
    const handleBookDelete = async (id: string) => {
        await bookDelete(id);
        message.success("删除成功");
        fetchData();
    }
    return (
        <Content title={"图书列表"} operation={<Button type='primary' onClick={()=>push("/dashboard/book/add")}>添加</Button>}> 
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
                                options={catagoryList.map((item) => {
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