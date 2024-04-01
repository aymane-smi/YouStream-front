"use client"
import {ColumnDef} from "@tanstack/react-table";
import { StudentInfoDTO } from "@/utils/models/StudentInfoDTO";
export const UserColumns:ColumnDef<StudentInfoDTO>[] = [
    {
        accessorKey: "id",
        header: "id"
    },
    {
        accessorKey: "username",
        header: "Username"
    },
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "active",
        header: "Active"
    },
]