import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { Button } from '@/components/custom/button'
import axiosInstance from '@/api/interceptors'
import interceptorsJson from '@/api/interceptorsJson'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ConfirmDelModal } from '../Modal/ConfirmDelModal'
import { AddReason } from '../Modal/AddReason'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useTranslation } from "react-i18next";


const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('User')} />
    )},
    cell: ({ row }: any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user')?.userName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'nationalId',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('NationaLId')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('nationalId')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'documentType',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('DocumentType')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('documentType')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'kycStatus',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('KycStatus')} />
    )},
    cell: ({ row }) => {
      const [isDialogOpen, setDialogOpen] = useState(false)
      const [reason, setReason] = useState('')
      const { t } = useTranslation();

      const { id, kycStatus } = row.original
      const queryClient: any = useQueryClient()
      // console.log('id', id)
      // console.log('kycStatus', kycStatus)

      // Function to handle KYC approval

      const handleKycAction = async (action: string, reson?: string) => {
        const accessToken = Cookies.get('accessToken')
        try {
          // Include the access token in the request headers
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
          if (action === 'approve') {
            // Make the API call to update the user's active status with the correct structure
            await axios.patch(baseURL + `user-kyc/${action}/${id}`, {}, config)
          } else {
            // Make the API call to update the user's active status with the correct structure
            await axios.patch(
              baseURL + `user-kyc/${action}/${id}`,
              { 'rejection-reason': reson },
              config
            )
          }

          queryClient.invalidateQueries(['user-kyc'])
        } catch (error) {
          console.error('Error updating user active status:', error)
          // Handle error as needed
        }
      }
      const handleCloseModal = () => {
        setDialogOpen(false)
      }

      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {kycStatus === 'pending' ? (
              <>
                <Button
                  variant='default'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleKycAction('approve')
                  }}
                >
                  {t("Approve")}
                </Button>
                <Button
                      variant='destructive'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation()
                        setDialogOpen(true)
                      }}
                    >
                      {t("Reject")}
                    </Button>
                {/* <Dialog open={isDialogOpen} onOpenChange={()=> setDialogOpen(true)}   >
                  <DialogTrigger asChild>
                  
                  </DialogTrigger> */}
                  <AddReason
                    IsOpen={isDialogOpen}
                    handleClick={(reason: any) =>
                      handleKycAction('reject', reason)
                    }
                    reason={reason}
                    setReason={(reason: string) => setReason(reason)}
                    setDialogOpen={handleCloseModal}
                  />
                {/* </Dialog> */}
              </>
            ) : (
              kycStatus
            )}
          </span>
        </div>
      )
    },
  },
]
