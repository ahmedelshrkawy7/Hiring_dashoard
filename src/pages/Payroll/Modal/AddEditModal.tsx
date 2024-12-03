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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import createCrudService from '@/api/services/crudService'
import { SelectComp } from '@/components/custom/SelectItem'
import { useTranslation } from 'react-i18next'

// Define the schema with only bonuses and deductions
const formSchema = z.object({
  bonuses: z.any(), // Bonuses field with default value 0
  deductions: z.any(), // Deductions field with default value 0
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
  const [userId, setUserId] = useState(0)
  const { mutate: createUser } = createCrudService<any>(
    `payroll?userId=${userId}`
  ).useCreateJson()
  const { mutate: updateUser } = createCrudService<any>( `payroll`).useUpdateJson()
  const allServiceUser = createCrudService<any>('user', {
    pageSize: 109999999,
  })
  const { useGetAll } = allServiceUser
  const { data: allUserData, isLoading } = useGetAll()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const title =
    modalType === 'Add'
      ? t('Add Bonuses and Deductions')
      : t('Edit Bonuses and Deductions')

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
      form.reset({ bonuses: 0, deductions: 0 }) 
      setUserId(0)
    }
    if (modalType === 'Edit') {
      form.reset(initialData) // Reset with initial data for Edit mode
      setUserId(initialData?.user?.id)
      form.reset(initialData) // Reset with initial data for Edit mode
      setUserId(initialData?.user?.id)
    }
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const payload = { ...values }

    try {
      if (modalType === 'Add') {
        await createUser(payload, {
          onSuccess: () => {
            setLoading(false)
            onClose()
          },
          onError: () => setLoading(false),
        })
      } else {
        await updateUser(
          { id: initialData.id, data: payload },
          {
            onSuccess: () => {
              setLoading(false)
              onClose()
            },
            onError: () => setLoading(false),
          }
        )
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
           {t("Fill in the Bonuses and Deductions below.")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid grid-cols-1 gap-y-4 px-2'>
              <div>{t("userId")}</div>
              <SelectComp
                defaultValue={userId}
                onValueChange={(value) => setUserId(Number(value))}
                placeholder={t('Select bonuses')}
                options={allUserData?.data?.data.map((user) => ({
                  value: String(user.id),
                  label: user.userName,
                }))}
              />

              <FormField
                control={form.control}
                name='bonuses'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Bonuses")}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Enter bonuses amount')}
                        {...field}
                        onChange={(e) => {
                          const { value } = e.target
                          form.setValue('bonuses', Number(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='deductions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Deductions")}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Enter deductions amount')}
                        {...field}
                        onChange={(e) => {
                          const { value } = e.target
                          form.setValue('deductions', Number(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-full mt-10 flex justify-center space-x-4'>
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
