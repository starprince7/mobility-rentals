import apiClient from "@/config/api"

export const signUpWithCredentials = async (data: { email: string, password: string, firstName: string, lastName: string }) => {
    return apiClient.post("/auth/register", {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
    })
}

export const signInWithCredentials = async (data: { email: string, password: string }) => {
    return apiClient.post("/auth/login", {
        email: data.email,
        password: data.password
    })
}