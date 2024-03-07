'use client'
import { Tag, Form, Button, Modal, Row, Col, Input, Select, Table, Space, message, TablePaginationConfig } from "antd";
import dayjs from "dayjs";
import { categoryDelete, getCategoryList } from "@/app/api/category";
import list from "antd/es/list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.css"

const LEVEL = {
    ONE: 1,
    TWO: 2,
}

export const LEVEL_OPTION = [
    { label: "级别1", value: LEVEL.ONE },
    { label: "级别2", value: LEVEL.TWO },
];

const COLUMNS = [
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: 300,
    },
    {
        title: "级别",
        dataIndex: "level",
        key: "level",
        ellipsis: true,
        width: 200,
        render: (text: number) => (
            <Tag color={text === 1 ? "green" : "cyan"}>{`级别${text}`}</Tag>
        ),
    },
    {
        title: "所属分类",
        dataIndex: "parent",
        key: "parent",
        ellipsis: true,
        width: 200,
        render: (text: { name: string }) => {
            return text?.name ?? "-";
        },
    },
];

export default function Page() {
    const [form] = Form.useForm();
    const {push } = useRouter();
    const [isModalOpen, setModalOpen] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    });
    const [editData, setEditData] = useState([]);

    async function fetchData(value?: any) {
        const res = await getCategoryList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...value,
        })
        const {data} = res;
        console.log(data);
        
        setEditData(data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleCategoryDelete = (id: string) => {
        Modal.confirm({
            title: "确认删除？",
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                await categoryDelete(id);
                message.success("删除成功");
            }
        })
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        console.log(pagination);
        setPagination(pagination);
    }
    const handleCategoryEdit =(id:string) => {
        push(`/dashboard/category/edit/${id}`)
    }
    const columns = [
        ...COLUMNS,
        {
            title: "操作",
            dataIndex: "",
            key: "action",
            render: (_: any, row: any) => (
                <Space>
                    <Button
                        type="link"
                        block
                        onClick={() => {
                            handleCategoryEdit(row._id);
                        }}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        danger
                        block
                        onClick={() => {
                            handleCategoryDelete(row._id)
                        }}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Form
                form={form}
                name="search"
                // className={styles.form}
                // onFinish={handleSearchFinish}
            >
                <Row gutter={24}>
                    <Col span={5}>
                        <Form.Item name="name" label="名称">
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="level" label="级别">
                            <Select
                                allowClear
                                placeholder="请选择"
                                options={LEVEL_OPTION}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={9} style={{ textAlign: "left" }}>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            清空
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div className={styles.tableWrap}>
                <Table
                dataSource={editData}
                columns={columns}
                onChange={handleTableChange}
                scroll={{ x: 1000 }}
                pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
            />
            </div>
        </>
    );
}