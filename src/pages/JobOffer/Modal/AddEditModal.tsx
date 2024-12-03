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
  selectOptions,
  userRoles,
} from '@/constant/constant'
import MultiSelect from '@/components/MultiSelect'
import interceptorsJson from '@/api/interceptorsJson'
import { showToast } from '@/api/interceptors'
import axios from 'axios'
import Cookies from 'js-cookie'
import { log } from 'console'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

// Define the schema
const formSchema = z.object({
  applicationId: z.any(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  salary: z.any(),
  insuranceAmount: z.any(),
  location: z.string().min(1, 'Location is required'),
  locationType: z.enum(['on-Site', 'off-Site', 'hybrid', 'remote']),
  tax: z.string().min(1, 'Tax is required'),
  jobEmploymentType: z.enum([
    'full_time',
    'part_time',
    'internship',
    'freelance',
    'contract',
    'temporary',
    'other',
  ]),
  companyName: z.string().min(1, 'Company Name is required'),
  jobHours: z.string().min(1, 'Job Hours is required'),
  startWorking: z.string().min(1, 'Start Working is required'),
  endWorking: z.string().min(1, 'End Working is required'),
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
  const { useGetById, useUpdate, useCreate } =
    createCrudService<any>('job-offer')
  const { mutate: createUser } = useCreate()
  const { mutate: createUserLogo } = useCreate()
  const { mutate: updateUser } = useUpdate()
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const title = modalType === 'Add' ? t('Add job-offer') : t('Edit job-offer')

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
    }
    if (modalType === 'Edit') {
      form.reset(initialData)
    }
  }, [initialData, form, modalType])

  const allServiceUser = createCrudService<any>('application')
  const { useGetAll } = allServiceUser
  const { data: allUserData, isLoading,refetch } = useGetAll()

  console.log('first', allUserData)
  const queryClient = useQueryClient()
  


  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const { applicationId, ...restValues } = values

    if (modalType === 'Add') {
      interceptorsJson
        .post(`/job-offer/${applicationId}`, {
          ...restValues,
          salary: Number(values.salary),
          insuranceAmount: Number(values.insuranceAmount),
        })
        .then((res) => {
          setLoading(false)
          onClose()
          showToast(
            t('Item created successfully'),
            t(`Item created successfully`),
            'default'
          )
          queryClient.invalidateQueries({ queryKey: ['job-offer'] })
        })
        .catch((err) => {
          setLoading(false)
          showToast('Error' , ``, 'default')
        })
    }
    if (modalType === 'Edit') {
      console.log('initialData', initialData)
      interceptorsJson
        .patch(`/job-offer/${initialData.id}`, {
          ...restValues,
          salary: Number(values.salary),
          insuranceAmount: Number(values.insuranceAmount),
        })
        .then((res) => {
          setLoading(false)
          onClose()
          showToast(
            t('Item created successfully'),
            t(`Item created successfully`),
            'default'
          )
          queryClient.invalidateQueries({ queryKey: ['job-offer'] })
        })
        .catch((err) => {
          setLoading(false)
          showToast('Error', ``, 'default')
        })
    }
  }

  const handleFilesChange = useCallback((newFiles: any[]) => {
    setFiles(newFiles)
  }, [])
  const allServiceUserx = createCrudService<any>('company')
  const { useGetAll: useGetAllx } = allServiceUserx
  const { data: allUserDatax, isLoading: isLoadingx } = useGetAllx()
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
              {/* Application ID */}
              {modalType === 'Add' && (
                <FormField
                  control={form.control}
                  name='applicationId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("User applicationId")}</FormLabel>
                      <FormControl>
                        <SelectComp
                          {...field}
                          onValueChange={field.onChange}
                          options={allUserData?.data?.data?.map((x: any) => ({
                            value: x.id,
                            label: x.applicationName,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Title */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Title")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t('Enter title')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Description")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t('Enter description')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary */}
              <FormField
                control={form.control}
                name='salary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Salary")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('Enter salary')}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Insurance Amount */}
              <FormField
                control={form.control}
                name='insuranceAmount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Insurance Amount")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('Enter insurance amount')}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Location")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("Enter location")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Type (Dropdown) */}
              <FormField
                control={form.control}
                name='locationType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Location Type")}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        onValueChange={field.onChange}
                        options={[
                          { value: 'on-Site', label: 'On-Site' },
                          { value: 'off-Site', label: 'Off-Site' },
                          { value: 'hybrid', label: 'Hybrid' },
                          { value: 'remote', label: 'Remote' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tax */}
              <FormField
                control={form.control}
                name='tax'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Tax")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t('Enter tax')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Employment Type (Dropdown) */}
              <FormField
                control={form.control}
                name='jobEmploymentType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Employment Type")}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        onValueChange={field.onChange}
                        options={[
                          { value: 'full_time', label: 'Full-Time' },
                          { value: 'part_time', label: 'Part-Time' },
                          { value: 'internship', label: 'Internship' },
                          { value: 'freelance', label: 'Freelance' },
                          { value: 'contract', label: 'Contract' },
                          { value: 'temporary', label: 'Temporary' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Name */}
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Company Name")}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        onValueChange={field.onChange}
                        options={allUserDatax?.data?.data?.map((item: any) => ({
                          value: item.id,
                          label: item.nameEn,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Hours */}
              <FormField
                control={form.control}
                name='jobHours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Job Hours")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t('Enter job hours')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Working */}
              <FormField
                control={form.control}
                name='startWorking'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Start Working")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='time'
                        placeholder={t('Enter start working time')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Working */}
              <FormField
                control={form.control}
                name='endWorking'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("End Working")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='time'
                        placeholder={t('Enter end working time')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex w-full justify-center gap-4 py-5'>
              <Button variant='destructive' onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button type='submit' loading={loading} disabled={loading}>
                {modalType === 'Add' ? t('Add') : t('Save')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditModal
