'use client'
import { Tag, Form, Button, Modal, Row, Col, Input, Select, Table, Space, message, TablePaginationConfig } from "antd";
import dayjs from "dayjs";
import { UserDelete, getUserList, userUpdate } from "@/app/api/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.css"
import Content from "@/app/components/Content";
import { UserQueryType } from "@/app/type";

const STATUS = {
    ON: "on",
    OFF: "off",
}

export const STATUS_OPTION = [
    { label: "正常", value: STATUS.ON },
    { label: "禁用", value: STATUS.OFF },
];

const COLUMNS = [
    {
        title: "账号",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: 200,
    },
    {
        title: "用户名",
        dataIndex: "nickName",
        key: "nickName",
        ellipsis: true,
        width: 200,
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        ellipsis: true,
        width: 150,
        render: (text: string) =>
            text === "on" ? (
                <Tag color="green">正常</Tag>
            ) : (
                <Tag color="red">已禁用</Tag>
            ),
    },
    {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 200,
        render: (text: number) => {
            return dayjs(text).format("YYYY-MM-DD");
        },
    },
];
export default function Page() {
    const [form] = Form.useForm();
    const { push } = useRouter();
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
    });
    const [editData, setEditData] = useState([]);

    async function fetchData(value?: any) {
        const res = await getUserList({
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...value,
        })
        const { data } = res;
        console.log(data);

        setEditData(data);
        setPagination({
            ...pagination,
            total: res.total,
        })
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleStatusChange = async (row) => {
        const status = row.status === STATUS.ON ? STATUS.OFF : STATUS.ON;
        await userUpdate({
            ...row,
            status,
        });
        fetchData(form.getFieldsValue());
    }
    const handleUserDelete = (id: string) => {
        Modal.confirm({
            title: "确认删除？",
            okText: "确定",
            cancelText: "取消",
            async onOk() {
                await UserDelete(id);
                message.success("删除成功");
                fetchData(form.getFieldsValue());
            }
        })
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        console.log(pagination);
        setPagination(pagination);
    }
    const handleUserEdit = (id: string) => {
        push(`/dashboard/user/edit/${id}`)
    }
    const handleSearchFinish = (values: UserQueryType) => {
        fetchData(values);
      };
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
                            handleUserEdit(row._id);
                        }}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        danger = {row.status === STATUS.ON ? true : false}
                        onClick={() => {
                            handleStatusChange(row);
                        }}
                    >
                        {row.status === STATUS.ON ? "禁用" : "启用"}
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            handleUserDelete(row._id)
                        }}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Content title={"用户列表"}>
            <Form
                form={form}
                name="search"
            className={styles.form}
            onFinish={handleSearchFinish}
            >
                <Row gutter={24}>
                    <Col span={5}>
                        <Form.Item name="name" label="名称">
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="status" label="状态">
                            <Select
                                allowClear
                                placeholder="请选择"
                                options={STATUS_OPTION}
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
        </Content>
    );
}