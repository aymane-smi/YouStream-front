"use client"
import {ColumnDef} from "@tanstack/react-table";
import { StrikeDTO } from "@/utils/models/StrikeDTO";
export const ReportColumns:ColumnDef<StrikeDTO>[] = [
    {
        accessorKey: "id",
        header: "id"
    },
    {
        accessorKey: "claimer.username",
        header: "Claimer"
    },
    {
        accessorKey: "streamer.username",
        header: "Streamer"
    },
    {
        accessorKey: "description",
        header: "Description"
    }
]