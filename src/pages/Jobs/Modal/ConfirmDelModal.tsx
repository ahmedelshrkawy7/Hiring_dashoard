import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import createCrudService from '@/api/services/crudService'
import { useTranslation } from 'react-i18next'

interface SellerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
}

export const ConfirmDelModal: React.FC<SellerDetailsModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
}) => {
  const allServiceUser = createCrudService<any>('jobs')
  const { useRemove } = allServiceUser
  const { mutate: useRemoveItem } = useRemove()
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  console.log('====================================')
  console.log(initialData)
  console.log('initialData==>>', initialData)
  console.log('initialData==>>', initialData?.id)
  console.log('====================================')
  const handleFormSubmit = async () => {
    setLoading(true)
    await useRemoveItem(
      { id: initialData.id },
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <div className=''>
          <div className='my-8 text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='inline w-14 fill-red-700'
              viewBox='0 0 24 24'
            >
              <path
                d='M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z'
                data-original='#000000'
              />
              <path
                d='M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z'
                data-original='#000000'
              />
            </svg>
            <h4 className='mt-4 text-lg font-semibold text-gray-800'>
              {t("Are you sure you want to delete it?")}
            </h4>
            {/* <p className='mt-4 text-sm text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas
            </p> */}
          </div>
          <div className='flex flex-col space-y-2'>
            <Button
              loading={loading}
              disabled={loading}
              variant={'destructive'}
              onClick={handleFormSubmit}
            >
              <span className='ms-1'>{t("Delete")}</span>
            </Button>

            <Button disabled={loading} variant={'outline'} onClick={onClose}>
              <span className='ms-1'>{t("Cancel")}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
