'use client'
import { getUserDetail } from "@/app/api/user";
import UserForm from "@/app/components/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
  const router = useParams()
  const [data, setData] = useState();
  const id = router.id;
  useEffect(() => {
    if(id){
      getUserDetail(id as string).then(res => {
        console.log(res.data);
        
        setData(res.data);
      })
    }
  },[])
  return <UserForm title="图书编辑" editData={data}/>;
}