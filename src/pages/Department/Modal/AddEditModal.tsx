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
import createCrudService from '@/api/services/crudService'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Define the schema
const formSchema = z.object({
  nameEn: z.string().nonempty('Name (English) is required'),
  descriptionEn: z.string().nonempty('Description (English) is required'),
  nameAr: z.string().nonempty('Name (Arabic) is required'),
  descriptionAr: z.string().nonempty('Description (Arabic) is required'),
  logo: z.any().optional(), // Logo is optional
})

interface AddEditModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: 'Add' | 'Edit'
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType = 'Add',
}) => {
  const params = useParams()
  const { useGetById, useUpdate, useCreate } =
    createCrudService<any>('department')
  const { mutate: createDepartment } = useCreate()
  const { mutate: updateDepartment } = useUpdate()
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const title = modalType === 'Add' ? t('Add New Department') : t('Edit Department')

  const defaultValues = useMemo(
    () => (modalType === 'Add' ? {} : initialData),
    [initialData, modalType]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(modalType === 'Edit' ? initialData : {})
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const formData = {
      ...values,
      logo: files,
    }
    try {
      if (modalType === 'Add') {
        await createDepartment(formData, {
          onSuccess: () => {
            setLoading(false)
            onClose()
          },
        })
      } else {
        await updateDepartment(
          { id: initialData.id, data: formData },
          {
            onSuccess: () => {
              setLoading(false)
              onClose()
            },
          }
        )
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleFilesChange = useCallback((newFiles: any[]) => {
    setFiles(newFiles)
  }, [])

  const allServiceJobs = createCrudService<any>('jobs')
  const { useGetAll } = allServiceJobs
  const { data: allUserData } = useGetAll()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {t("Fill in the department details below.")}
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
                    <FormLabel>{t("NameEn")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter department name in English')}
                        {...field}
                      />
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
                    <FormLabel>{t("DescriptionEn")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter description in English')}
                        {...field}
                      />
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
                    <FormLabel>{t("NameAr")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter department name in Arabic')}
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
                    <FormLabel>{t("DescriptionAr")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter description in Arabic')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Previews
                initialFiles={files}
                onFilesChange={(e) => {
                  setFiles(e)
                }}
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
