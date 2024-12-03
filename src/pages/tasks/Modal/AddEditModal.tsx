import React, { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import Previews from '@/components/custom/ImgFilesDND'
import { SelectComp } from '@/components/custom/SelectItem'
import { CheckboxWithText } from '@/components/custom/CheckboxWithText'
import { useNavigate, useParams } from 'react-router-dom'
import createCrudService from '@/api/services/crudService'
import { userRoles } from '@/constant/constant'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

// Define the schema
const formSchema = z.object({
  // userName: z.string().min(1, 'User name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  // active: z.boolean(),
  // isVerified: z.boolean(),
  // profilePicture: z.any(),
  status: z.string(),
})

interface AddEditModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const params = useParams()
  const { useGetById, useUpdate, useCreate } = createCrudService<any>('user')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdate()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [updatedEmail, setUpdatedEmail] = useState('')
  const [updatePassword, setUpdatePassword] = useState('')
  const [files, setFiles] = useState<any[]>([])
  const queryClient = useQueryClient()

  const title = modalType === 'Add' ? 'Add New User' : 'Edit User'

  const defaultValues = useMemo(
    () => (modalType === 'Add' ? {} : initialData),
    [initialData, modalType]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    if (modalType === 'Add') {
      form.reset({})
    }
    if (modalType === 'Edit') {
      form.reset(initialData)
    }
  }, [initialData, form, modalType])
  console.log('initialData', initialData)

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log('values', values)
    if (modalType === 'Add') {
      await createUser(values, {
        onSuccess: () => {
          setLoading(false)
          onClose()
        },
        onError: () => {
          setLoading(false)
        },
      })
    } else {
      await updateUser(
        { id: initialData.id, data: values },
        {
          onSuccess: () => {
            setLoading(false)
            onClose()
          },
          onError: () => {
            setLoading(false)
          },
        }
      )
    }
  }
  const handelEditUser =async () => {
    const accessToken = Cookies.get('accessToken')
    const baseURL = import.meta.env.VITE_API_BASE_URL
    console.log('first')
    try {
      // Include the access token in the request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      // Checking if the update is for email or password and sending the appropriate request
      let endpoint = isEmail ? `user/update-user-email/${initialData.id}` : `user/update-user-password/${initialData.id}`;
      let data = isEmail ? { email: updatedEmail } : { password: updatePassword };
  
      // Make the API call to update the user's email or password
      const res = await axios.patch(baseURL + endpoint, data, config);
      // Make the API call to update the user's active status with the correct structure
     
      console.log('res', res)

      // If the update is successful, invalidate the 'user' queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onClose()
    } catch (error) {
      console.error('Error updating user active status:', error);
      onClose()
      // Handle error as needed
    }
  };
  
  
  const handleFilesChange = useCallback((newFiles: any[]) => {
    setFiles(newFiles)
  }, [])

  console.log('updatedEmail', updatedEmail)
  console.log('updatePassword', updatePassword)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Fill in the user details below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={e=> {
              e.preventDefault()
              handelEditUser()
            }}
            className='my-5 px-4'
          >
            <SelectComp
              onValueChange={(value) => {
                value === 'true' ? setIsEmail(true) : setIsEmail(false)
              }}
              options={[
                { value: 'true', label: 'Email' },
                { value: 'false', label: 'Password' },
              ]}
            />
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-x-hidden overflow-y-scroll px-2 md:w-auto md:grid-cols-2 md:gap-4 mt-6'>
              {isEmail ? (
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Email' onChange={(e) => setUpdatedEmail(e.target.value)}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter password' onChange={e=>setUpdatePassword(e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        options={userRoles}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='active'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <CheckboxWithText {...field} label='Is Active' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isVerified'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified</FormLabel>
                    <FormControl>
                      <CheckboxWithText {...field} label='Is Verified' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='profilePicture'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Previews
                        initialFiles={files}
                        onFilesChange={(e) => {
                          field.onChange(e)
                          setFiles(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className='col-span-full mt-10 flex items-center justify-center space-x-4 md:justify-between md:px-8'>
              <Button
                size='lg'
                variant='default'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                size='lg'
                variant='outline'
                type='button'
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditModal
