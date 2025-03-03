import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { toast } from '@/components/ui/use-toast'
import { setGlobalLoading } from '@/context/LoadingContext'
import { getToken } from '@/utils/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
})

// Helper function to display toast
export const showToast = (
  title: string,
  description: string,
  variant: 'destructive' | 'default'  = 'destructive'
) => {
  toast({
    title,
    description,
    duration: 3000,
    variant,
  })
}


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    setGlobalLoading(true)

    const token = getToken()

    config.headers.Authorization = `Bearer ${token}`
    // config.headers['Content-Type'] = 'application/json'
    config.headers['Content-Type'] = 'multipart/form-data'

    config.headers['Accept'] = '*/*'
    // config.headers['Accept'] = 'multipart/form-data'

    return config
  },
  (error: AxiosError) => {
    setGlobalLoading(false)
    showToast('Error', 'An error occurred while making the request.')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setGlobalLoading(false)
    return response
  },
  (error) => {
    setGlobalLoading(false)
    console.log('====================================')
    console.log(error)
    console.log('====================================')
    if (error.status === 400) {
      showToast('Error', 'Bad Request')
    }
    if (error.status === 500) {
      showToast('Error', 'Internal Server Error')
    }
    if (error.response?.status === 401) {
      showToast('Error', 'Unauthorized access - token expired.')
      window.location.href = '/'
    } else {
      console.log('====================================')
      console.log(error.response?.data?.data.message)
      console.log('====================================')
      showToast(
        error.response?.data?.data.message,
        `Error: ${error.response?.status} - ${error.response?.data?.data?.message}`
      )
      // window.location.href = "/";
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
