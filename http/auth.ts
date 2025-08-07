import apiClient from "@/config/api"
import { ToastService } from "@/services"

export const signUpWithCredentials = async (data: { email: string, password: string, firstName: string, lastName: string }) => {
    try {
        const response = await apiClient.post("/auth/register", {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        })

        ToastService.auth.signupSuccess()

        return response
    } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
            ToastService.network.timeout()
            throw new Error('Request timed out. Please try again.')
        } else if (error.response) {
            const apiErrorMessage = error.response.data?.error || error.response.data?.message
            if (apiErrorMessage) {
                ToastService.auth.signupFailed(apiErrorMessage)
                throw new Error(apiErrorMessage)
            } else {
                ToastService.network.serverError(error.response.status)
                throw new Error(`Server error: ${error.response.status}`)
            }
        } else if (error.request) {
            ToastService.network.noConnection()
            throw new Error('Network error. Please check your connection.')
        }

        throw error
    }
}

export const signInWithCredentials = async (data: { email: string, password: string }) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email: data.email,
            password: data.password
        })

        ToastService.auth.loginSuccess()

        return response
    } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
            ToastService.network.timeout()
            throw new Error('Request timed out. Please try again.')
        } else if (error.response) {
            const apiErrorMessage = error.response.data?.error || error.response.data?.message
            if (apiErrorMessage) {
                ToastService.auth.loginFailed(apiErrorMessage)
                throw new Error(apiErrorMessage)
            } else {
                ToastService.network.serverError(error.response.status)
                throw new Error(`Server error: ${error.response.status}`)
            }
        } else if (error.request) {
            ToastService.network.noConnection()
            throw new Error('Network error. Please check your connection.')
        }

        throw error
    }
}