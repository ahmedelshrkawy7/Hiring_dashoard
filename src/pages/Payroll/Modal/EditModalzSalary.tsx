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

// Define the schema with only salary
const formSchema = z.object({
  salary: z.any(), // Salary field
})

interface SalaryUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const SalaryUpdateModal: React.FC<SalaryUpdateModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const { mutate: updateSalary } = createCrudService<any>('payroll').useUpdateJson()
  const allServiceUser = createCrudService<any>('user', {
    pageSize: 109999999,
  })
  const { useGetAll } = allServiceUser
  const { data: allUserData } = useGetAll()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();

  const title = t('Update Salary')

  const defaultValues = useMemo(
    () => ({ salary: initialData.salary }),
    [initialData, modalType]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset({ salary: initialData.salary }) // Reset with initial data for Edit mode
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const payload = { ...values }

    try {
      await updateSalary(
        { id: initialData.id, data: {salary : Number(values.salary)} },
        {
          onSuccess: () => {
            setLoading(false)
            onClose()
          },
          onError: () => setLoading(false),
        }
      )
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
          <DialogDescription>{t("Update the salary below.")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid grid-cols-1 gap-y-4 px-2'>
              <FormField
                control={form.control}
                name='salary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Salary")}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Enter salary amount')}
                        {...field}
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
                {loading ? t('Submitting...') : t('Update Salary')}
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

export default SalaryUpdateModal
