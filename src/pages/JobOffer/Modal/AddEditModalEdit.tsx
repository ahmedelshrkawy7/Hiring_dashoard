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

// Define the schema with only the status field
const formSchema = z.object({
  status: z.enum(['seen', 'accepted', 'rejected']),
})

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const AddEditModalEdit: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const title = modalType === 'Add' ? 'Add Status' : 'Edit Status'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: initialData?.status || 'viewed' }, // Default status value
  })

  useEffect(() => {
    if (modalType === 'Edit') {
      form.reset(initialData)
    }
  }, [initialData, form, modalType])
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    interceptorsJson
      .patch(`/job-offer/${initialData.id}`, {
        ...values,
      })
      .then((res) => {
        setLoading(false)
        onClose()
        showToast(
          'Item updated successfully',
          `Item updated successfully`,
          'default'
        )
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Select a status for the application.
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <SelectComp
                      {...field}
                      onValueChange={field.onChange}
                      options={[
                        { value: 'seen', label: 'seen' },
                        { value: 'accepted', label: 'Accepted' },
                        { value: 'rejected', label: 'Rejected' },
                      ]}
                    />
        
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full justify-center gap-4 py-5'>
              <Button type='button' variant='destructive' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' disabled={loading} loading={loading}>
                {modalType === 'Add' ? 'Add' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditModalEdit
