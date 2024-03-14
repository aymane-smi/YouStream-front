import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig();
import "./sidebar.css";

export const Sidebar = ()=>{
    const tmp = Array(1,2,3,4,5,6,7,8);
    return <div className="max-w-[200px] h-[calc(100vh-70px)] bg-[#1F1F23] flex-1 flex flex-col justify-start items-center overflow-y-scroll hide-scroll">
        <p className="font-bold text-[12px] p-3">RECOMMENDED CHANNELS</p>
        {/* avatars of all users */}
        <div className="flex flex-col justify-start items-center">
            {tmp.map((i)=>{
                return <div className='flex justify-center items-center gap-3' title="full namesddsdsdsdsdd">
                    <Avatar className="w-[30px] h-[30px] my-3" {...config} key={i}/>
                    <p>{"full namesddsdsdsdsdd".length > 10 ? "full namesddsdsdsdsdd".slice(10)+"..." : "full namesddsdsdsdsdd"}</p>
                </div>
            })}
        </div>
    </div>;
}