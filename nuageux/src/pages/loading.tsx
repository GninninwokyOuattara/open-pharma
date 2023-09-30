import { Loader2 } from "lucide-react"

const LoadingState = () => {
    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center text-5xl text-bold gap-4">
            <h1 className="animate-pulse">
                Open<span className="text-green-500">Pharma</span>
            </h1>
            <Loader2 className="animate-spin text-orange-500" />
        </div>
    )
}

export default LoadingState