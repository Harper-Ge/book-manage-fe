'use client'
import { getBorrowDetail } from "@/app/api/borrow";
import BorrowForm from "@/app/components/BorrowForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    getBorrowDetail(router.id as string).then((res) => {
      setData(res.data);
    });
  })
    return <BorrowForm title="借阅编辑" editData={data}/>;
  };
  
  export default Page;