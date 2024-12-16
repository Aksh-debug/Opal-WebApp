'use client'

import { getAllUserVideos } from "@/actions/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import useQueryData from "@/hooks/useQueryData";
import { VideosProps } from "@/types/index.type";
import VideoCard from "./video-card";
import { cn } from "@/lib/utils";

type Props={
    workspaceId:string
}

const Test=({workspaceId}:Props)=>{

    console.log(workspaceId)
    const {data}=useQueryData(['user-videos'],()=>getAllUserVideos(workspaceId))
    console.log('dataaaa',data)
    const {status:videoStatus,data:videos}=data as VideosProps;

    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <VideoRecorderDuotone/>
                    <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
                </div>
            </div>
            <section
            className={cn(videoStatus!==200
                ? 'p-5'
                : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            )}
            >
                {
                    videoStatus===200 ?
                    (
                        videos.map((video)=><VideoCard key={video.id} workspaceId={workspaceId} {...video}/>)
                    ) :
                    (
                        <p className="text-[#BdBdBd]">No videos in workspace</p>
                    )
                }
            </section>
        </div>
    )
};

export default Test;