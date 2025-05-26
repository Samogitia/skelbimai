import axios from 'axios'

async function favoriteAPI(request) {
      try {
            const res = await request()
            return { success: true, data: res.data, status: res.status}
      }
      catch (error) {
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Favorite API error"
            }
      }
}

async function favoriteAddAPI(userId, advertId) {
      const token = localStorage.getItem("token")
      const result = await favoriteAPI(() => axios.post("/api/favorite/add", {userId, advertId},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function favoriteRemoveAPI(userId, advertId) {
      const token = localStorage.getItem("token")
      const result = await favoriteAPI(() => axios.delete("/api/favorite/delete",
            {     
                  data: {userId, advertId},
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function favoriteGetAPI(userId) {
      const token = localStorage.getItem("token")
      const result = await favoriteAPI(() => axios.get(`/api/favorite/get/${userId}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

export { favoriteAddAPI, favoriteRemoveAPI, favoriteGetAPI }