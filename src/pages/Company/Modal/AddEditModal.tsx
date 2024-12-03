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
import MultiSelect from '@/components/MultiSelect'
import createCrudService from '@/api/services/crudService'
import { companyCategories } from '@/constant/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'

// Define the schema
const formSchema = z.object({
  nameEn: z.string().nonempty({ message: 'English name is required' }),
  nameAr: z.string().nonempty({ message: 'Arabic name is required' }),
  descriptionEn: z
    .string()
    .nonempty({ message: 'English description is required' }),
  descriptionAr: z
    .string()
    .nonempty({ message: 'Arabic description is required' }),
  website: z.string().url({ message: 'Website URL is required' }),
  addressEn: z.string().nonempty({ message: 'English address is required' }),
  addressAr: z.string().nonempty({ message: 'Arabic address is required' }),
  categories: z
    .array(z.string())
    .nonempty({ message: 'At least one category is required' }),
  logo: z.any().optional(),
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
  const { useCreate, useUpdate } = createCrudService<any>('company')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdate()
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const title = modalType === 'Add' ? t('Add New Company') : t('Edit Company')

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
      form.reset({})
      setFiles([])
    } else if (modalType === 'Edit') {
      form.reset(initialData)
      // setFiles([initialData.logo])
    }
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    // Create an object to hold all the categorized data
    const formData = { ...values, logo: files }

    // Handle categories if they contain a comma
    if (values.categories.includes(',')) {
      const newCategories = (values.categories as any)
        .split(',')
        .map((item) => item.trim())
      formData.categories = newCategories // Add the processed categories to formData
    } else {
      const newCategories = (values.categories as any)
        .map((item) => item.trim())
        newCategories.push('.');
      formData.categories = newCategories
    }

    // Handle modal type logic (Add or Update)
    const submitHandler = modalType === 'Add' ? createUser : updateUser

    // Structure the payload for updating the user, if necessary
    const payload =
      modalType === 'Add' ? formData : { id: initialData.id, data: formData }
    console.log('====================================')
    console.log("form data company",formData)
    console.log('====================================')
    try {
      await submitHandler(payload, {
        onSuccess: () => {
          setLoading(false)
          onClose()
        },
        onError: () => {
          setLoading(false)
        },
      })
    } catch (error) {
      setLoading(false)
      console.error('Error submitting form:', error)
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
          <DialogDescription>
            {t("Fill in the Company details below.")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-x-hidden overflow-y-scroll px-2 md:w-auto md:grid-cols-2 md:gap-4'>
              <FormField
                control={form.control}
                name='nameEn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("English Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter English name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='nameAr'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Arabic Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Arabic name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='descriptionEn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("English Description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Enter English description')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='descriptionAr'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Arabic Description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Enter Arabic description')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Website")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter website URL')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='addressEn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("English Address")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter English address")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='addressAr'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Arabic Address")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter Arabic address")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='categories'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Categories")}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={companyCategories}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Previews
                initialFiles={files}
                onFilesChange={(e) => setFiles(e)}
              />
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
