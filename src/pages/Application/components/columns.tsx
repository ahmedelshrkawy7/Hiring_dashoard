import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import axiosInstance from '@/api/interceptors'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'applicationName',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('ApplicationName')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('applicationName')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Description')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('description')}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'isActive',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='isActive Status' />
  //   ),
  //   cell: ({ row }) => {
  //     let isActive = row.getValue('applicationStatus')
  //     let staus = false
  //     if (isActive === 'viewed') {
  //       staus = true
  //     }
  //     if (isActive === 'rejected') {
  //       staus = false
  //     }
  //     if (isActive === 'accepted') {
  //       staus = false
  //     }
  //     if (isActive === 'new') {
  //       staus = true
  //     }
  //     const queryClient = useQueryClient()

  //     const toggleActiveStatus = async (e) => {
  //       e.stopPropagation()
  //       const newActiveStatus = !isActive

  //       try {
  //         // Send the patch request to update the status
  //         await axiosInstance.patch(
  //           `application/${isActive ? 'reject' : 'accept'}/${row.original.id}`
  //         )
  //         queryClient.invalidateQueries({ queryKey: ['application'] })
  //       } catch (error) {
  //         console.error('Error updating active status:', error)
  //       }
  //     }

  //     return (
  //       <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
  //         <label className='relative inline-flex cursor-pointer items-center'>
  //           <input
  //             onChange={toggleActiveStatus}
  //             type='checkbox'
  //             checked={isActive ? true : false}
  //             className='peer sr-only'
  //           />
  //           <div
  //             className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700`}
  //           ></div>
  //         </label>
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('IsActive')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('isActive') ? 'Yes' : 'No'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'applicationStatus',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('ApplicationStatus')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('applicationStatus')}
          </span>
        </div>
      )
    },
  },
]
