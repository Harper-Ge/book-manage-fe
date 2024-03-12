'use client'
import Content from "@/app/components/Content";
import { Form, Input, Select, Button, message } from "antd";
import { Rule } from "antd/es/form";
import styles from './index.module.css'
import { useEffect, useState } from "react";
import { getUserList } from "@/app/api/user";
import { getBookList } from "@/app/api/book";
import { borrowUpdate, postBorrowAdd } from "@/app/api/borrow";
const rule = (label: string): Rule[] => [{
    required: true,
    message: `请输入${label}`
}]
export default function BorrowForm({ title, editData }:{ title:string }) {
    const [form] = Form.useForm();
    const [userList, setUserList] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [stock, setStock] = useState(0);
    const handleFinish = async(values) => {
        try {
            if (editData?._id) {
              await borrowUpdate(editData._id, values);
              message.success("编辑成功");
            } else {
              await postBorrowAdd(values);
              message.success("创建成功");
            }
          } catch (error) {
            console.error(error);
          }
    }
    const handleBookChange = (_, o) => {
        setStock(o.stock)
    }
    useEffect(() => {
        getUserList().then(res => {
            setUserList(res.data);
        });
        getBookList().then(res => {
            setBookList(res.data);
        });;
    }, [])
    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item label="书籍名称" name="book"
                    rules={rule("分类")}>
                    <Select
                    onChange={handleBookChange}
                        options={bookList.map((item) => {
                            return {
                                label: item.name,
                                value: item._id,
                                stock: item.stock,
                            }
                        })}>

                    </Select>
                </Form.Item>
                <Form.Item label="借阅用户" name="user"
                    rules={rule("分类")}>
                    <Select
                        options={userList.map((item) => {
                            return {
                                label: item.name,
                                value: item._id,
                            }
                        })}>

                    </Select>
                </Form.Item>
                <Form.Item
                    label="书籍库存"
                    name="stock"
                >
                    {stock}
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button
                        htmlType='submit'
                        type='primary'
                        className={styles.btn}
                        disabled={stock<=0}
                    >
                        创建
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}
