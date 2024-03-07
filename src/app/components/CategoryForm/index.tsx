'use client'
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    message} from 'antd';
import { Rule } from 'antd/es/form';
import { CategoryType } from '@/app/type';
import styles from './index.module.css'
import { useRouter } from 'next/navigation';
import Content from '../Content';
import { LEVEL_OPTION } from '@/app/dashboard/category/page';
import { getCategoryList, postCategoryAdd } from '@/app/api/category';

const rule = (label: string): Rule[] => [{
    required: true,
    message: `请输入${label}`
}]
function CategoryForm ({title}:{title:string}) {
    const [preview, setPreview] = useState("");
    const [form] = Form.useForm();
    const { push } = useRouter()
    const [level, setLevel] = useState(1);
    const [levelOneList, setLevelOneList] = useState<CategoryType[]>([]);
    
    const handleFinish = async (values: CategoryType) => {
        await postCategoryAdd(values);
        message.success("创建成功");
        push("/dashboard/category");
    }

    useEffect(() => {
        async function fetchData() {
            const res = await getCategoryList({});
            setLevelOneList(res.data);
        }
        fetchData();
        
    },[])
    const levelOneOptions = useMemo(() => {
        return levelOneList.map((item) => ({
            value: item._id,
            label: item.name,
        }))
    }, [levelOneList])
    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item label="名称" name="name"
                    rules={rule("名称")}>
                    <Input />
                </Form.Item>
                <Form.Item label="级别" name="level"
                    rules={[
                        {
                            required: true,
                            message: "请选择级别"
                        }]}>
                    <Select
                        onChange={(value) => {
                            console.log(value);
                            setLevel(value)
                        }}
                        placeholder="请选择"
                        options={LEVEL_OPTION}></Select>
                </Form.Item>
                {level === 2 && <Form.Item label="所属级别" name="parent"
                    rules={[
                        {
                            required: true,
                            message: "请选择级别"
                        }]}>
                    <Select  placeholder="请选择" options={levelOneOptions}></Select>
                </Form.Item>}
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

export default CategoryForm;