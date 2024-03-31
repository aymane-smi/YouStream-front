"use client"
import {ColumnDef} from "@tanstack/react-table";
import { User } from "./page";
export const UserColumns:ColumnDef<User>[] = [
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
        accessorKey: "isActive",
        header: "Active"
    },
]