import axios from 'axios'

async function categoryAPI(request) {
      try {
            const res = await request()
            return { success: true, data: res.data, status: res.status }
      }
      catch (error) {
            console.log(error.response.data.message)
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Category API error"
            }
      }
}

async function getCategoriesAPI() {
      const token = localStorage.getItem("token")
      const result = await categoryAPI(() => axios.get("/api/categories/get", 
      {
            headers: {
                  Authorization: `Bearer ${token}`
            }
      }))
      console.log(result.data)
      return result
}

async function categoryCreateAPI(category) {
      const token = localStorage.getItem("token")
      const result = await categoryAPI(() => axios.post("/api/categories/create", {category},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }))
            return result
}

getCategoriesAPI()

export { getCategoriesAPI, categoryCreateAPI }