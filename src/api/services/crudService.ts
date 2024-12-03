/* eslint-disable react-hooks/rules-of-hooks */
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query'
import axiosInstance from '../interceptors'
import { toast } from '@/components/ui/use-toast'
import { useSearchParams } from 'react-router-dom'
import interceptorsJson from '../interceptorsJson'

interface CrudService<T> {
  useGetAll: () => any
  useGetById: (id: string) => any
  useCreate: () => any
  useUpdate: () => any
  useRemove: () => any
  useDel: () => any
  useCreateJson: () => any
  useUpdateJson : () => any
  useCreateWithParams: () => any
}
const showToast = (title: string, description?: string) => {
  toast({
    title: title,
    description: description,
    duration: 3000,
    variant: 'default',
  })
}

const createCrudService = <T>(
  endpoint: string,
  filter = {} as any,
  page = 1,
  limit = 10
): CrudService<T> => {
  const queryClient: any = useQueryClient()
  const [searchParams] = useSearchParams()

  const queryParams: { [key: string]: string | null } = {}
  searchParams.forEach((value, key) => {
    queryParams[key] = value
  })
  const useGetAll = () => {
    return useQuery<T[]>({
      queryKey: [endpoint, queryParams],
      queryFn: async () => {
        const response = await axiosInstance.get(endpoint, {
          params: {
            ...queryParams,
            ...filter,
          },
        })
        return response.data
      },
    })
  }

  const useGetById = (id: string) =>
    useQuery<T>({
      queryKey: [endpoint, id],
      queryFn: async () => {
        const response = await axiosInstance.get<T>(`${endpoint}/${id}`)
        return response.data
      },
    })

    const useCreate = () =>
      useMutation<T, unknown, T>({
        mutationFn: async (data: T) => {
          const formData = new FormData()
          console.log('====================================')
          console.log("company data",data)
          console.log('====================================')
  
          // Append data to formData
          Object.entries(data as any).forEach(([key, value]) => {
            if (key === 'logo' && Array.isArray(value)) {
              value.forEach((file: File) => {
                formData.append('logo', file) // Append actual File objects
              })
            }  else if (Array.isArray(value)) {
              // For any other array (like categories), map over it
              value.forEach((item) => {
                formData.append(`${key}`, item) // Append each item in the array
              })
            } else {
              // For other fields, append the value directly
              formData.append(key, value as any)
            }
          })
  
          // Log the FormData object for debugging
          for (let [key, value] of formData.entries()) {
            console.log(key, value)
          }
  
          // Send the formData instead of data
          const response = await axiosInstance.post<T>(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
          })
  
          return response.data // Return the response data
        },
  
        onSuccess: () => {
          showToast('Item created successfully')
          queryClient.invalidateQueries([endpoint])
        },
      })

      
    const useCreateWithParams = () =>
      useMutation<T, unknown,{ departmentId: string; data: T }, T>({
        mutationFn: async ({ departmentId, data }) => {
          const formData = new FormData()
          console.log('====================================')
          console.log("company data",data)
          console.log('====================================')
  
          // Append data to formData
          Object.entries(data as any).forEach(([key, value]) => {
            if (key === 'logo' && Array.isArray(value)) {
              value.forEach((file: File) => {
                formData.append('logo', file) // Append actual File objects
              })
            }  else if (Array.isArray(value)) {
              // For any other array (like categories), map over it
              value.forEach((item) => {
                formData.append(`${key}`, item) // Append each item in the array
              })
            } else {
              // For other fields, append the value directly
              formData.append(key, value as any)
            }
          })
  
          // Log the FormData object for debugging
          for (let [key, value] of formData.entries()) {
            console.log(key, value)
          }
  
          // Send the formData instead of data
          const response = await axiosInstance.post<T>(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
            params: {departmentId}
          })
  
          return response.data // Return the response data
        },
  
        onSuccess: () => {
          showToast('Item created successfully')
          queryClient.invalidateQueries([endpoint])
        },
      })
  const useCreateJson = () =>
    useMutation<T, unknown, T>({
      mutationFn: async (data: T) => {
        // Send the formData instead of data
        const response = await interceptorsJson.post<T>(endpoint, data, {
          headers: {
            'Content-Type': 'application/json', // Set the content type for file uploads
          },
        })

        return response.data // Return the response data
      },

      onSuccess: () => {
        showToast('Item created successfully')
        queryClient.invalidateQueries([endpoint])
      },
    })

  const useUpdate = () =>
    useMutation<T, unknown, { id: string; data: T }>({
      mutationFn: async ({ id, data }) => {
        const formData = new FormData()

        Object.entries(data as any).forEach(([key, value]) => {
          if (key === 'logo' && Array.isArray(value)) {
            value.forEach((file: File) => {
              formData.append('logo', file) // Append actual File objects
            })
          } else if (Array.isArray(value)) {
            // For any other array (like categories), map over it
            value.forEach((item) => {
              formData.append(`${key}`, item) // Append each item in the array
            })
          } else {
            // For other fields, append the value directly
            formData.append(key, value as any)
          }
        })
        const response = await axiosInstance.patch<T>(
          `${endpoint}/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
          }
        )
        return response.data
      },

      onSuccess: () => {
        showToast('item updated successfully')

        queryClient.invalidateQueries([endpoint])
      },
    })
  const useUpdateJson = () =>
    useMutation<T, unknown, { id: string; data: T }>({
      mutationFn: async ({ id, data }) => {

        const response = await interceptorsJson.patch<T>(
          `${endpoint}/${id}`,
          data
        )
        return response.data
      },

      onSuccess: () => {
        showToast('item updated successfully')

        queryClient.invalidateQueries([endpoint])
      },
    })

  const useRemove = () =>
    useMutation<void, unknown, string>({
      mutationFn: async ({ id }: any) => {
        await axiosInstance.patch(`${endpoint}/delete/${id}`)
      },
      onSuccess: () => {
        showToast('item deleted successfully')

        queryClient.invalidateQueries([endpoint])
      },
    })
  const useDel = () =>
    useMutation<void, unknown, string>({
      mutationFn: async ({ id }: any) => {
        await axiosInstance.delete(`${endpoint}/${id}`)
      },
      onSuccess: () => {
        showToast('item deleted successfully')

        queryClient.invalidateQueries([endpoint])
      },
    })
  return {
    useGetAll,
    useGetById,
    useCreate,
    useCreateWithParams,
    useUpdate,
    useRemove,
    useDel,
    useCreateJson,
    useUpdateJson
  }
}

export default createCrudService
