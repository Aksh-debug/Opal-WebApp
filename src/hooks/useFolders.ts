import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos=(videoId:string,currentWorkspace:string)=>{
    const {folders}=useAppSelector((store)=>store.FolderReducer);
    const {workspaces}=useAppSelector((store)=>store.WorkspaceReducer);
    
    // fetching states
    const [isFetching,setIsFetching]=useState(false);

    // stat folders
    const [isFolders,setIsFolders]=useState<
    | ({
        _count:{
            videos:number
        }
    } & {
        id:string
        name:string
        createdAt:Date
        workSpaceId:string|null
    })[]
    | undefined
    >(undefined)

     // use mutation for optimistic data
    const {mutate,isPending}=useMutationData(
        ['change-video-location'],
        (data:{folder_id:string; workspace_id:string})=>
        moveVideoLocation(videoId,data.workspace_id,data.folder_id)
    )

    // use zod form
    const {errors,onFormSubmit,watch,register}=useZodForm(moveVideoSchema,mutate,{folder_id:null,workspace_id:currentWorkspace})

    //fetching folders with useEffect
    const fetchFolders=async(workspace:string)=>{
        setIsFetching(true)
        const folders=await getWorkspaceFolders(workspace)
        setIsFetching(false)
        setIsFolders(folders.data)
    }
    useEffect(()=>{
        fetchFolders(currentWorkspace)
    },[])

    useEffect(()=>{
        const workspace=watch(async(value)=>{
            if(value.workspace_id) fetchFolders(value.workspace_id)
        })
    return ()=>workspace.unsubscribe()
    },[watch])

    return {
        onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        workspaces,
        isFetching,
        isFolders,
    }
}
