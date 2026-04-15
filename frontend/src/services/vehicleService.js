import api from "./api"

export const createVehicleRequest = async(data) => {
    const response = await api.post("/car", data)
    return response.data
}

export const getVehiclesRequest = async() => {
    const response = await api.get(`/car`)
    return response.data
}

export const deleteVehicleRequest = async(id) => {
    const response = await api.delete(`/car/${id}`)
    return response.data
}