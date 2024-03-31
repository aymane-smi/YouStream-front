"use client"
import { AdminNav } from "@/components/shared/AdminNav/AdminNav"
import { UserTable } from "./UserRows"
import { UserColumns } from "./UserColumns"

export type Report = {}
export type User = {
    id: number,
    username: string
    firstName: string,
    lastName: string,
    isActive: boolean
}
export default function Dashboard(){
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
                <UserTable columns={UserColumns} data={[{
                    id: 1,
                    username: "aymane",
                    firstName: "aymane",
                    lastName: "belassiria",
                    isActive: true
                }]}/>
            </>
        </div>
    </>
}