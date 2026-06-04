import api from "./api"

export const createParkingRequest = async(data) => {
    const response = await api.post("/parking", data)
    return response.data
}

export const getActiveParkingRequest = async(carId) => {
    const response = await api.get(`/parking/active/${carId}`)

    return response.data
}