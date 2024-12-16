import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

type Props={
    state:boolean
    className?:string
    color?:string
    children?:React.ReactNode
}

const Loader=({state,className,children}:Props)=>{
    return state?(
        <div className={cn(className)}>
            <Spinner/>
        </div>
    ) : (
        children
    )
};

export default Loader;