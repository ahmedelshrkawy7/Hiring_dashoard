import React, { useEffect, useState } from 'react'
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
import { SelectComp } from '@/components/custom/SelectItem'
import interceptorsJson from '@/api/interceptorsJson'
import { showToast } from '@/api/interceptors'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

// Define the schema with only the status field
const formSchema = z.object({
  status: z.enum(['accepted', 'rejected', 'viewed']),
})

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const AddEditModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const { t } = useTranslation();

  const title = modalType === 'Add' ? t('Add Status') : t('Edit Status')
console.log('====================================');
console.log(initialData);
console.log('====================================');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: initialData?.applicationStatus || 'viewed' }, // Default status value
  })

  useEffect(() => {
    if (modalType === 'Edit') {
      form.reset(initialData)
    }
  }, [initialData, form, modalType])
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    interceptorsJson
      .patch(
        `/application/${values.status === 'accepted' ? 'accept' : 'reject'}/${initialData.id}`
      )
      .then((res) => {
        setLoading(false)
        onClose()
        showToast(
          t('Item created successfully'),
          t(`Item created successfully`),
          'default'
        )
        showToast(
          t('Item created successfully'),
          t(`Item created successfully`),
          'default'
        )
        queryClient.invalidateQueries({ queryKey: ['application'] })
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {t("Select a status for the application.")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Status")}</FormLabel>
                  <FormControl>
                    <SelectComp
                      {...field}
                      defaultValue={initialData?.applicationStatus || 'viewed'}
                      onValueChange={field.onChange}
                      options={[
                        { value: 'accepted', label: 'Accepted' },
                        { value: 'rejected', label: 'Rejected' },
                        // { value: 'viewed', label: 'viewed' },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full justify-center gap-4 py-5'>
              <Button type='button' variant='destructive' onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button type='submit' disabled={loading} loading={loading}>
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
