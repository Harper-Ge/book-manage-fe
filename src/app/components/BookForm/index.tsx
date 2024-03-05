'use client'
import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Space,
    Switch,
    Image,
    message,
    InputNumber
} from 'antd';
import { Rule } from 'antd/es/form';
import { BookType } from '@/app/type';
import { postBookAdd } from '@/app/api/hook';
import styles from './index.module.css'
import { useRouter } from 'next/navigation';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const rule = (label: string): Rule[] => [{
    required: true,
    message: `请输入${label}`
}]
const BookForm: React.FC = () => {
    const [preview, setPreview] = useState("");
    const [form] = Form.useForm();
    const {push} = useRouter()
    const handleFinish = async (values: BookType) => {
        console.log(values);
        await postBookAdd(values);
        message.success("创建成功")
        push("/dashboard/book")
    }
    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                className={styles.form}
                onFinish={handleFinish}
                form={form}
            >
                <Form.Item label="名称" name="name"
                    rules={rule("名称")}>
                    <Input />
                </Form.Item>
                <Form.Item label="作者" name="author"
                    rules={rule("作者")}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="分类" name="category"
                    rules={rule("分类")}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="封面" name="cover"
                    style={{ width: '100%' }}
                >
                    <Space.Compact>
                        <Input
                            onChange={(e) => {
                                form.setFieldValue("cover", e.target.value)
                            }}
                        />
                        <Button type='primary'
                            onClick={(e) => {
                                setPreview(form.getFieldValue("cover"));
                            }}>预览</Button>
                    </Space.Compact>
                </Form.Item>
                {preview && (<Form.Item label=" " colon={false}>
                    <Image src={preview} width={100} height={100} alt='cover' />
                </Form.Item>)}
                <Form.Item label="出版日期" name='publishAt'>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="库存" name='stock'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="描述" name="description">
                    <TextArea rows={4} />
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
        </>
    );
};

export default BookForm;