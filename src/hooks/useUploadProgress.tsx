import { useState } from "react"

export const UploadFileProgress = () => {
    const [progressData, setProgressData] = useState()

    return {
        progressData,
        setProgressData
    }
}