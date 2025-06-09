import axios from 'axios'

async function advertAPI(request) {
      try {
            const res = await request()
            return { success: true, data: res.data, status: res.status}
      }
      catch (error) {
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Advert API error"
            }
      }
}

async function createAdvertAPI(name, description, category_id, price, user_id, photos) {
      const token = localStorage.getItem("token")
      const result = await advertAPI(() => axios.post("/api/adverts/create", {name, description, category_id, price, user_id, photos},
            {
                  headers: {
                        Authorization: `Bearer ${token}` 
                  }
            }
      ))
      return result
}

async function getAllAdvertsAPI() {
      const token = localStorage.getItem("token")
      const result = await advertAPI(() => axios.get("/api/adverts/get", 
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function deleteAdvertAPI(id) {
      const token = localStorage.getItem("token")
      const result = await advertAPI(() => axios.delete(`/api/adverts/delete/${id}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }))
            return result
}

export {createAdvertAPI, getAllAdvertsAPI, deleteAdvertAPI}