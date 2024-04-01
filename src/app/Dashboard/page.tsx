"use client"
import { AdminNav } from "@/components/shared/AdminNav/AdminNav"
import { UserTable } from "./UserRows"
import { UserColumns } from "./UserColumns"
import { useQuery } from "react-query"
import apis from "@/utils/API"
import { ReportTable } from "@/components/table/report/ReportRows"
import { ReportColumns } from "@/components/table/report/ReportColumns"
import { useEffect, useState } from "react"

export default function Dashboard(){
    const {data, isLoading, error} = useQuery("getStrikes", {
        queryFn: ()=>apis.strike.getStrikes()
    });
    const {data: userData, isLoading: userIsLoading, error:userError} = useQuery("getUsers", {
        queryFn: ()=>apis.student.getStudentInfo()
    });
    const [checkboxes, setCheckboxes] = useState<{
        id: number,
        active: boolean
    }[]>([]);
    useEffect(()=>{
        if(userData !== undefined)
            userData?.data?.map((item)=>setCheckboxes((old)=>[...old, {id: item.id, active: item.active}]));
    },[userData]);
    return <>
        <AdminNav />
        <div className="flex flex-col w-full justify-center items-start p-6 gap-5">
            <>
                <p className="font-bold">List of users</p>
                <UserTable columns={UserColumns} data={userData?.data || []} checks={checkboxes} setCheck={setCheckboxes}/>
            </>
            <>
                <p className="font-bold">List of reports</p>
                <ReportTable columns={ReportColumns} data={data?.data || []}/>
            </>
        </div>
    </>
}