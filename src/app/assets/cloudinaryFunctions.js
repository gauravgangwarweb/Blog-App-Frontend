import axios from "axios"

export const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET
const apiKey = process.env.NEXT_PUBLIC_API_KEY
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET

export const imageUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', upload_preset)
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        )
        console.log(response);
        const data = {
            url: response.data.url,
            publicId: response.data.public_id
        }
        return data
    } catch (error) {
        console.log("Error while uploading")
    }
}