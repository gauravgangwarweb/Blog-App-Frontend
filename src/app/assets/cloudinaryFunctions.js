import axios from "axios"
import generateSignature from "../api/generateSignature"

export const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET
const apiKey = process.env.NEXT_PUBLIC_API_KEY
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET

// Cloudinary.config({
//   cloud_name: cloudName,
//   api_key: apiKey,
//   api_secret: apiSecret
// })

export const imageUpload = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', upload_preset)
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    )

    const data = {
      url: response.data.url,
      publicId: response.data.public_id
    }
    return data
  } catch (error) {
    console.log("Error while uploading")
  }
}

export const deleteImage = async (publicId) => {
  console.log(publicId)
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`
  const timestamp = Math.floor(Date.now()/1000)
  const signature = await generateSignature(publicId, timestamp, apiSecret)
  console.log(signature);
  try {
    const response = await axios.post(url, {
        timestamp,
        signature,
        public_id: publicId,
        api_key: apiKey,
    })
    
    if(response.status == 200) {
      const data = {
        url: ""
      }
      console.log("Image deleted succesfully")
      return data
    } else {
      console.error("Image deletion failed")
    }
  } catch (error) {
    console.error("Error deleting image:", error)
  }
};