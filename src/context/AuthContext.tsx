import axiosInstance from '@/api/interceptors'
import axios from 'axios'
import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { toast } from '@/components/ui/use-toast'

const baseURL = import.meta.env.VITE_API_BASE_URL

const AuthContext = createContext<any | undefined>(undefined)
const showToast = (title: string, description: string) => {
  toast({
    title: title,
    description: description,
    duration: 3000,
    variant: 'destructive',
  })
}

const AuthProvider = ({ children }: any) => {
  const accessToken = Cookies.get('accessToken')
  const [user, setUser] = useState<any>(accessToken || null)

  // const login = async (username, password) => {
  //   const response = await axios.post(`${baseURL}/auth/login`, { username, password });
  //   const token = response.headers.authorization.split(' ')[1];
  //   localStorage.setItem('token', token);
  //   setUser(token);
  // };
  const login = async (username: string, password: string) => {
    const apiUrl = baseURL + 'auth/login'

    try {
      const response: any = await axios.post(
        apiUrl,
        {
          email : username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      console.log('Login response:', response)

      Cookies.set('accessToken', response?.data?.data?.accessToken, {
        expires: 1,
        path: '/',
      })
      Cookies.set('refreshToken', response?.data?.data?.refreshToken, {
        expires: 1,
        path: '/',
      })
      setUser(response?.data.accessToken)
      return 'success'
    } catch (error:any) {
      console.error('Login failed', error)
      showToast(
        error.response?.data?.message,
        `Error: ${error.response?.status} - ${error.response?.data?.message}`
      )
      return 'error'
    }
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
