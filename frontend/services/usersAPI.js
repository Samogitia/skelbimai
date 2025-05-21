import axios from 'axios'

// async function userLoginAPI(email, password) {
//       try{
//             const res = await axios.post("/api/users/login", {email, password})
//             console.log(res)
//             return res
//       }
//       catch (error) {
//             return error.response.data.message
//       }
// }

// async function userRegisterAPI(name, last_name, email, status, password) {
//       try {
//             const res = await axios.post("/api/users/create", {name, last_name, email, status, password})
//             return res
//       }
//       catch (error) {
//             return error.response.data.message
//       }
// }

async function userAPI(request) {
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
                  message: error.response?.data?.message || "User API error"
            }
      }
}


async function userLoginAPI(email, password) {
      const result = await userAPI(() => axios.post("/api/users/login", {email, password}))
      return result
      
}

async function userRegisterAPI(name, last_name, email, status, password) {
      const result = await userAPI(() => axios.post("/api/users/create", {name, last_name, email, status, password}))
      return result
      
}

export { userLoginAPI, userRegisterAPI }