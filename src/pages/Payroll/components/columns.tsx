import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/react-query'

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
    accessorKey: 'user',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('User')} />
    )},
    cell: ({ row }:any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user') ? row.getValue('user').userName : 'N/A'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'jobOffer',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('JobOffer')} />
    )},
    cell: ({ row }:any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('jobOffer') ? row.getValue('jobOffer').title : 'N/A'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Salary')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('salary')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'bonuses',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Bonuses')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('bonuses')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'deductions',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Deductions')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('deductions')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'netSalary',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('NetSalary')} />
      )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('netSalary')}
          </span>
        </div>
      )
    },
  },
  {

    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Status' )}/>
    )},
    cell: ({ row }) => {
      let isActive = row.getValue('status')
      const queryClient = useQueryClient()
      
        const updateUserActiveStatus = async (newActiveStatus: boolean) => {
          const accessToken = Cookies.get('accessToken')
          const baseURL = import.meta.env.VITE_API_BASE_URL
          try {
            // Include the access token in the request headers
            const config = {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            };
        
            // Make the API call to update the user's active status with the correct structure
            await axios.patch( baseURL + `payroll/update-status/${row.original.id}`, 
              { status: newActiveStatus }, 
              config
            );
        
            // If the update is successful, invalidate the 'user' queries
            queryClient.invalidateQueries({ queryKey: ['payroll'] });
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
  
  // {
  //   accessorKey: 'logo',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='logo' />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('logo')}
  //           <img
  //             src={row.getValue('logo') || 'https://dummyimage.com/500x500.png'}
  //             alt={row.getValue('name') }
  //             className=' h-10 w-10 rounded-full'
  //           />
  //         </span>
  //       </div>
  //     )
  //   },
  // },

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
