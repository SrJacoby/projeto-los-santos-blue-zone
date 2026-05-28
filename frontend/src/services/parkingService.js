import api from "./api"

export const createParkingRequest = async(data) => {
    const response = await api.post("/parking", data)
    return response.data
}