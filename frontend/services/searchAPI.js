import axios from 'axios'

async function searchAPI(request) {
      try {
            const res = await request()
            return { success: true, data: res.data, status: res.status}
      }
      catch (error) {
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Search API error"
            }
      }
}

async function searchAdvertsAPI(search, category) {
      const token = localStorage.getItem("token")
      const result = await searchAPI(() => axios.get("/api/adverts/search", 
            {
                  params: {search, category},
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

export { searchAdvertsAPI }