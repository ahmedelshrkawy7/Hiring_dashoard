import React, { useEffect, useState, useMemo } from 'react'
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
  FormTextAreaField,
  FormTextField,
} from '@/components/custom/RusableFormInputs'
import { Button } from '@/components/custom/button'
import createCrudService from '@/api/services/crudService'
import Previews from '@/components/custom/ImgFilesDND'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import MultiSelect from '@/components/MultiSelect'
import { companyCategories } from '@/constant/constant'
import { SelectComp } from '@/components/custom/SelectItem'
import { useTranslation } from 'react-i18next'

// Define the schema based on the provided structure
const formSchema = z.object({
  nameEn: z.string().min(1, { message: 'English name is required' }),
  descriptionEn: z
    .string()
    .min(1, { message: 'English description is required' }),
  nameAr: z.string().min(1, { message: 'Arabic name is required' }),
  descriptionAr: z
    .string()
    .min(1, { message: 'Arabic description is required' }),
  count: z.string().min(1, { message: 'Count must be a number' }),
  salary: z.string().min(1, { message: 'Salary must be a number' }),
  categories: z
    .array(z.string())
    .min(1, { message: 'Categories must be an array and not empty' }),
  requiredSkills: z
    .array(z.string())
    .min(1, { message: 'Required skills must be an array and not empty' }),
  preferredSkills: z
    .array(z.string())
    .min(1, { message: 'Preferred skills must be an array and not empty' }),
  logo: z.any().optional(),
  departmentId: z.any().optional(),
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
  const { useGetById, useUpdate, useCreate , useCreateWithParams } = createCrudService<any>('jobs')
  const { mutate: createUser } = useCreate()
  const { mutate: createUserWithParams } = useCreateWithParams()
  const { mutate: updateUser } = useUpdate()
  const { t } = useTranslation();

  const [files, setFiles] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const title = modalType === 'Add' ? t('Add New Job') : t('Edit Job')
  const allServiceUser = createCrudService<any>('jobs')
  const { useGetAll } = allServiceUser
  const { data: allUserData, isLoading } = useGetAll()

  const [departmentId, setDepartmentId] = useState<number | undefined>(undefined)
  const allServiceUserD = createCrudService<any>('Department')
  const { useGetAll: useGetAllDepartment } = allServiceUserD
  const { data: AllDepartment } = useGetAllDepartment()


  const defaultValues = useMemo(
    () => (modalType === 'Add' ? {} : initialData),
    [initialData, modalType]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(modalType === 'Add' ? {} : initialData)
  }, [initialData, form, modalType])
 

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
   
    const submitAction = modalType === 'Add' ? createUserWithParams : updateUser
    const mutationParams =
      modalType === 'Add'
        ? {
          departmentId: departmentId,
            data: {
              ...values,
              count: Number(values.count),
              salary: Number(values.salary),
              logo: files,
            },
          }
        : {
            id: initialData.id,
            data: {
              ...values,
              count: Number(values.count),
              salary: Number(values.salary),
              logo: files,
            },
          }

    await submitAction(mutationParams, {
      onSuccess: () => {
        setLoading(false)
        onClose()
      },
      onError: () => setLoading(false),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{t("Fill in the Job details below.")}</DialogDescription>
        </DialogHeader>
        <SelectComp
          onValueChange={(selectedValue) => {
            console.log('departmentId', selectedValue)
            setDepartmentId(Number(selectedValue))
          }}
          options={AllDepartment?.data?.map((x: any) => ({
            value: x.id,
            label: x.nameEn,
          }))}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-y-scroll px-2 md:grid-cols-2 md:gap-4'>
              {/* <FormField
                control={form.control}
                name={'departmentId'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Company'}</FormLabel>
                    <FormControl>
                      <SelectComp
                       {...field}
                       onValueChange={(selectedValue) => {
                         console.log("departmentId",selectedValue);
                         field.onChange(selectedValue);
                         setDepartmedId(Number(selectedValue));
                      }}
                       options={AllDepartment?.data?.map((x: any) => ({
                         value: x.id,
                         label: x.nameEn,
                       }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormTextField
                form={form}
                name='nameEn'
                label={t('English Name')}
                placeholder={t('Enter English name')}
              />
              <FormTextField
                form={form}
                name='descriptionEn'
                label={t('English Description')}
                placeholder={t('Enter English description')}
              />
              <FormTextField
                form={form}
                name='nameAr'
                label={t('Arabic Name')}
                placeholder={t('Enter Arabic name')}
              />
              <FormTextField
                form={form}
                name='descriptionAr'
                label={t('Arabic Description')}
                placeholder={t('Enter Arabic description')}
              />
              <FormTextField
                form={form}
                name='count'
                label={t('Count')}
                placeholder={t('Enter count')}
              />
              <FormTextField
                form={form}
                name='salary'
                label={t('Salary')}
                placeholder={t('Enter salary')}
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

              <FormTextAreaField
                form={form}
                name='requiredSkills'
                label={t('Required Skills')}
                placeholder={t('Enter required skills as a comma-separated list')}
              />
              <FormTextAreaField
                form={form}
                name='preferredSkills'
                label={t('Preferred Skills')}
                placeholder={t('Enter preferred skills as a comma-separated list')}
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
