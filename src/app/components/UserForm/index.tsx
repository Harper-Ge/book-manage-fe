'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message,
    Radio
} from 'antd';
import { Rule } from 'antd/es/form';
import { CategoryType, UserType } from '@/app/type';
import styles from './index.module.css'
import { useRouter } from 'next/navigation';
import Content from '../Content';
import { getCategoryList } from '@/app/api/category';
import { postUserAdd, userUpdate } from '@/app/api/user';
import { USER_ROLE, USER_SEX, USER_STATUS } from '@/app/constant/user';

const rule = (label: string): Rule[] => [{
    required: true,
    message: `请输入${label}`
}]
const UserForm = ({ title, editData = {
    sex: USER_SEX.MALE,
    status:USER_STATUS.ON,
    role: USER_ROLE.USER
} }:{
    title: string;
    editData?: Partial<UserType>;
}) => {
    const [preview, setPreview] = useState("");
    const [form] = Form.useForm();
    const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    const { push } = useRouter();
    useEffect(() => {
        if(editData._id) {
            form.setFieldsValue(editData);
        }
    },[editData]);
    const handleFinish = async (values: UserType) => {
        if(editData?._id) {
            await userUpdate(values);
        }else{
            await postUserAdd(values);
        }
        await postUserAdd(values);
        message.success("创建成功")
        push("/dashboard/user")
    }
    useEffect(() => {
        getCategoryList({ all: true }).then((res) => {
            setCategoryList(res.data);
        })
    }, [])
    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                initialValues={editData}
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item label="账号" name="name"
                    rules={rule("账号")}>
                    <Input />
                </Form.Item>
                <Form.Item label="名称" name="nickName"
                    rules={rule("名称")}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="性别" name="sex"
                    rules={rule("性别")}>
                    <Radio.Group>
                        <Radio value="male">男性</Radio>
                        <Radio value="female">女性</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="密码" name="password"
                >
                    <Input.Password
                        onChange={(e) => {
                            form.setFieldValue("cover", e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item label="状态" name="status"
                    rules={rule("状态")}>
                    <Radio.Group>
                        <Radio value="on">启用</Radio>
                        <Radio value="off">禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="角色" name="role"
                    rules={rule("角色")}>
                    <Radio.Group>
                        <Radio value="user">用户</Radio>
                        <Radio value="admin">管理员</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button
                        htmlType='submit'
                        type='primary'
                        className={styles.btn}
                    >
                        创建
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
};

export default UserForm;