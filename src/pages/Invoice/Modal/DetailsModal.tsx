import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'

interface SellerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: Record<string, any>
}

export const DetailsModal: React.FC<SellerDetailsModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
}) => {
  const excludedKeys = [
    'password',
    'updatedAt',
    'deletedAt',
    'resetToken',
    'id',
    'profilePicture',
    'startDate',
    'endDate',
    'createdAt',
    'created_at',
    'deleted_at',
    'updated_at',
    'isDeleted',
    'id',
    '_id',
    '__v',
    'isCurrent',
    'profilePicture',
    'fileUrl',
    'password',
    'resetToken',
    'isVerified',
    'isVerified',
    'resetTokenExpiration',
    'refreshToken',
  ]

  const { t } = useTranslation();
  const formatKey = (key: string) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())

  const renderValue = (key: string, value: any) => {
    // Check if value is an array and matches certain keys
    if (
      (key === 'images' ||
        key === 'image' ||
        key === 'profilePicture' ||
        key === 'fileUrl' ||
        key === 'logo') &&
      Array.isArray(value)
    ) {
      return (
        <div className='my-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {value.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className='h-32 w-full rounded-xl border border-muted object-cover shadow-md transition-transform hover:scale-105'
            />
          ))}
        </div>
      )
    }

    // Check if value is an array
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index} className='ml-4 mt-2 border-l-4 border-primary pl-4 border-b-2 '>
          {typeof item === 'object' && item !== null ? (
            renderObject(item) // Assuming renderObject is defined elsewhere
          ) : (
            <span className='text-muted-foreground'>{item}</span>
          )}
        </div>
      ))
    }

    // Check if value is an object
    if (typeof value === 'object' && value !== null) {
      return renderObject(value) // Assuming renderObject is defined elsewhere
    }

    // Handle cases for string values (images and PDFs)
    if (typeof value === 'string') {
      if (value.endsWith('jpg')) {
        return (
          <img
            key={value}
            src={value}
            alt={`Image ${value}`}
            className='h-32 w-full rounded-xl border border-muted object-cover shadow-md transition-transform hover:scale-105'
          />
        )
      }
      if (value.endsWith('.pdf')) {
        return (
          <a
            href={value}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            View PDF
          </a>
        )
      }
    }

    // Fallback for other values
    return <span className='text-muted-foreground'>{value}</span>
  }

  const renderObject = (obj: Record<string, any>) => {
    return (
      <div className='space-y-3'>
        {Object.entries(obj)
          .filter(([subKey]) => !excludedKeys.includes(subKey))
          .map(([subKey, subValue]) => (
            <div key={subKey} className='space-y-2 '>
              <strong className='font-semibold text-primary'>
                {t(formatKey(subKey))}:
              </strong>
              <div className='text-muted-foreground '>
                {renderValue(subKey, subValue)}
              </div>
              <Separator className='my-2' />
            </div>
          ))}
      </div>
    )
  }
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg bg-background p-8 shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-extrabold text-primary'>
            {t("Detailed Information")}
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            {t("Here are all the relevant details displayed in an organized manner.")}
          </DialogDescription>
        </DialogHeader>

        <div className='mt-8 grid grid-cols-1 gap-8'>
          {Object.entries(initialData)
            .filter(
              ([key, value]) =>
                !excludedKeys.includes(key) && value !== undefined
            )
            .map(([key, value]) => (
              <div
                key={key}
                className='rounded-lg border border-muted bg-card p-6 shadow-lg grid grid-cols-4'
              >
                <div className='mb-4 text-xl font-semibold text-primary'>
                  {t(formatKey(key))}
                </div>
                <div className='text-muted-foreground col-span-3'>
                  {renderValue(key, value)}
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
