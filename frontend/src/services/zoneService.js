import api from "./api"

export const getZonesRequest = async() => {
    const response = await api.get("/zone")
    return response.data
}