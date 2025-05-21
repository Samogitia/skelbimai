import axios from 'axios'

async function photoAPI(request) {
      try {
            const res = await request()
            console.log(res)
            return { success: true, data: res.data, status: res.status }
      }
      catch (error) {
            console.log(error.response.data.message)
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Photo API error"
            }
      }
}


async function createPhotoAPI(advert_id, url) {
      const token = localStorage.getItem("token")
      const result = await photoAPI(() => axios.post("/api/photos/create", {advert_id, url},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function getPhotosAPI(advert_id) {
      const token = localStorage.getItem("token")
      const result = await photoAPI(() => axios.get("/api/photos/get", {advert_id},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

export { createPhotoAPI, getPhotosAPI }