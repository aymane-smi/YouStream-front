"use client"
import { AdminNav } from "@/components/shared/AdminNav/AdminNav"
import { UserTable } from "./UserRows"
import { UserColumns } from "./UserColumns"
import { useQuery } from "react-query"
import apis from "@/utils/API"
import { ReportTable } from "@/components/table/report/ReportRows"
import { ReportColumns } from "@/components/table/report/ReportColumns"

export type Report = {}
export type User = {
    id: number,
    username: string
    firstName: string,
    lastName: string,
    isActive: boolean
}
export default function Dashboard(){
    const {data, isLoading, error} = useQuery("getStrikes", {
        queryFn: ()=>apis.strike.getStrikes()
    });
    console.log(data);
    return <>
        <AdminNav />
        <div className="flex flex-col w-full justify-center items-start p-6 gap-5">
            <>
                <p>List of users</p>
                <UserTable columns={UserColumns} data={[{
                    id: 1,
                    username: "aymane",
                    firstName: "aymane",
                    lastName: "belassiria",
                    isActive: true
                }]}/>
            </>
            <>
                <p>List of reports</p>
                <ReportTable columns={ReportColumns} data={data?.data || []}/>
            </>
        </div>
    </>
}