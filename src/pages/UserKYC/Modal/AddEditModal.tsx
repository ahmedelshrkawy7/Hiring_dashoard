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
import v from '@/locales/en.json'

// Define the schema
const formSchema = z.object({
  nationalId : z.any(),
  documentType : z.any(),


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
  const { useGetById, useUpdate, useCreate } = createCrudService<any>('user-kyc')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdate()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
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

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
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

  const handleFilesChange = useCallback((newFiles: any[]) => {
    setFiles(newFiles)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Fill in the user details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-x-hidden overflow-y-scroll px-2 md:w-auto md:grid-cols-2 md:gap-4'>
              <FormField
                control={form.control}
                name='nationalId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter user name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='documentType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>documentType</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter documentType' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>location</FormLabel>
                    <FormControl>
                    <Input placeholder='Enter location' {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='user'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>user</FormLabel>
                    <FormControl>
                    <Input placeholder='Enter user' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified</FormLabel>
                    <FormControl>
                      <CheckboxWithText {...field} label='Is Active' />
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
              <Button type='button' size='lg' variant='outline' onClick={onClose}>
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
