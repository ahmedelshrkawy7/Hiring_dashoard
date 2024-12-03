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
import {
  companyCategories,
  invoiceStatus,
  selectOptions,
  userRoles,
} from '@/constant/constant'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  // name: z.any(),
  // description: z.any(),
  // website: z.any(),
  // address: z.any(),
  // logo: z.any(),
  // categories: z.any(),
  status: z.any(),
  amount: z.any(),
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
  const { useGetById, useUpdate, useCreate } = createCrudService<any>('invoice')
  const { mutate: createUser } = useCreate()
  const { mutate: createUserLogo } = useCreate()
  const { mutate: updateInvoice } = createCrudService<any>('invoice').useUpdateJson()
  const navigate = useNavigate()
  const { t } = useTranslation();


  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const title = modalType === 'Add' ? t('Add New User') : t('Edit Invoice')


  // const defaultValues = useMemo(
  //   () => (modalType === 'Add' ? {} : initialData),
  //   [initialData, modalType]
  // )
  const defaultValues = useMemo(
    () => ({ amount: initialData.amount , status: initialData.status }),
    [initialData, modalType]
  )
console.log('initialData', initialData)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    if (modalType === 'Add') {
      form.reset({})
      form.reset({})
    }
    if (modalType === 'Edit') {
      form.reset(initialData)
    }
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log('====================================');
    console.log(files);
    console.log('====================================');
    const accessToken = Cookies.get('accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
   
    if (modalType === 'Add') {
      await createUser({ ...values, logo: files }, {
        onSuccess: () => {
          setLoading(false)
          onClose()
        },
        onError: () => {
          setLoading(false)
        },
      })
    } else {
      await updateInvoice(
        { id: initialData.id, data: {amount : Number(values.amount) , status : values.status} },
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
          {/* <DialogDescription>
            Fill in the Company details below.
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-x-hidden overflow-y-scroll px-2 md:w-auto md:grid-cols-2 md:gap-4'>
              {/* <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter user name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

             

              {/* <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>website</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter website' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name='categories'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>categories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={companyCategories}
                        onValueChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
             <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Status")}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        onValueChange={field.onChange}
                        options={invoiceStatus}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("amount")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter amount')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            

              
              

              {/* <FormField
                control={form.control}
                name='logo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>logo</FormLabel>
                    <FormControl>
                      
                      <Previews
                        initialFiles={files}
                        onFilesChange={(e) => {
                          field.onChange(e)
                          console.log('====================================');
                          console.log(e);
                          console.log('====================================');
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
                {loading ? t('Submitting...') : t('Submit')}
              </Button>
              <Button
                type='button'
                size='lg'
                variant='outline'
                onClick={onClose}
              >
                {t("Cancel")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditModal
