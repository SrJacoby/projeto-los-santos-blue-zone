import api from "./api"

export const createVehicleRequest = async(data) => {
    const response = await api.post("/car", data)
    return response.data
}

export const getVehiclesRequest = async(userId) => {
    const response = await api.get(`/car/user/${userId}`)
    return response.data
}