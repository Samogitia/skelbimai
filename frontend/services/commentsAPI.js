import axios from 'axios'

async function commentAPI(request) {
      try {
            const res = await request()
            return {success: true, data: res.data, status: res.status}
      }
      catch (error) {
            return {
                  success: false,
                  status: error.response?.status || 500,
                  message: error.response?.data?.message || "Comment API error"
            }
      }
}

async function createCommentAPI(advertId, userId, comment) {
      const token = localStorage.getItem("token")
      const result = await commentAPI(() => axios.post("/api/comments/create", {advertId, userId, comment},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function getAllCommentsByIdAPI(advertId) {
      const token = localStorage.getItem("token")
      const result = await commentAPI(() => axios.get(`/api/comments/get/${advertId}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function deleteCommentAPI(commentId) {
      const token = localStorage.getItem("token")
      const result = await commentAPI(() => axios.delete(`/api/comments/delete/${commentId}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function deleteCommentAdminAPI(commentId) {
      const token = localStorage.getItem("token")
      const result = await commentAPI(() => axios.delete(`/api/comments/deletefull/${commentId}`,
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

async function restoreCommentAPI(commentId) {
      const token = localStorage.getItem("token")
      const result = await commentAPI(() => axios.put("/api/comments/restore", {commentId},
            {
                  headers: {
                        Authorization: `Bearer ${token}`
                  }
            }
      ))
      return result
}

export { createCommentAPI, getAllCommentsByIdAPI, deleteCommentAPI, restoreCommentAPI, deleteCommentAdminAPI}