import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useState, useEffect } from 'react';
import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import axiosInstance from '@/api/interceptors'
import { useQueryClient , useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Task' />
  //   ),
  //   cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t("UserName")} />

      )
    },
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('userName')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'userCode',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t("UserCode")} />

      )
    },
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('userCode')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Email')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('email')}
          </span>
        </div>
      )
    },
  },
 
  {
    accessorKey: 'isVerified',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('IsVerified')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('isVerified') ? 'Yes' : 'No'}
          </span>
        </div>
      )
    },
  },
  
  {
    accessorKey: 'role',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Role')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('role')}
          </span>
        </div>
      )
    },
  },
  {

    accessorKey: 'active',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Active Status' )}/>
    )},
    cell: ({ row }) => {
      let isActive = row.getValue('active')
      const queryClient = useQueryClient()
      
        const updateUserActiveStatus = async (newActiveStatus: boolean) => {
          const accessToken = Cookies.get('accessToken')
          try {
            // Include the access token in the request headers
            const config = {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            };
        
            // Make the API call to update the user's active status with the correct structure
            await axios.patch( baseURL + `user/${row.original.id}`, 
              { active: newActiveStatus }, 
              config
            );
        
            // If the update is successful, invalidate the 'user' queries
            queryClient.invalidateQueries({ queryKey: ['user'] });
          } catch (error) {
            console.error('Error updating user active status:', error);
            // Handle error as needed
          }
        };
      
        // Function to toggle the active status
        const toggleActiveStatus = (e) => {
          e.stopPropagation();
          const newActiveStatus = !isActive;
          const booleanNewActiveStatus = Boolean(newActiveStatus);
          // Call the function to update the user's active status
          updateUserActiveStatus(booleanNewActiveStatus);
        };

      

// _____________________________________________________________

      // const toggleActiveStatus = async (e) => {
      //   e.stopPropagation()
      //   const newActiveStatus = !isActive
      //   // const newActiveStatus = "change active status"
      //   console.log('newActiveStatus', newActiveStatus)

      //   try {
      //     // Send the patch request to update the status
          // await axiosInstance.patch(`user/${row.original.id}`, {
      //       active: newActiveStatus ,
      //     })
      //     queryClient.invalidateQueries({ queryKey: ['user'] })
      //   } catch (error) {
      //     console.error('Error updating active status:', error)
      //   }
      // }

      return (
        <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
          <label className='relative inline-flex cursor-pointer items-center'>
            <input
              onChange={toggleActiveStatus}
              type='checkbox'
              checked={isActive ? true : false}
              className='peer sr-only'
            />
            <div
              className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700`}
            ></div>
          </label>
        </div>
      )
    },
  },
  {
    accessorKey: 'profilePicture',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('ProfilePictures')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            <img
              src={
                row.getValue('profilePicture') ||
                'https://dummyimage.com/500x500.jpg'
              }
              alt='profilePicture'
              className='h-10 w-10 rounded-full'
            />
          </span>
        </div>
      )
    },
  },

  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue('status')
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && (
  //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Priority' />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue('priority')
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && (
  //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => (
  //     <div>
  //       <DataTableRowActions row={row} />,
  //     </div>
  //   ),
  // },
]
