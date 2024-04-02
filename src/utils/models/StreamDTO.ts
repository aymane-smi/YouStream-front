import { StudentInfoDTO } from "./StudentInfoDTO";
import { TagDTO } from "./TagDTO";

export interface StreamDTO{
    id:Number,
    viewsNbr: Number,
    restricted: boolean,
    file_name: string,
    tags: TagDTO[],
    student: any,
    owner: any;
    subscribers: StudentInfoDTO
}