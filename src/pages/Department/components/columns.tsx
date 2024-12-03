import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'nameEn',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('NameEn')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('nameEn')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'descriptionEn',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('DescriptionEn')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('descriptionEn')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'nameAr',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('NameAr')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('nameAr')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'descriptionAr',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('DescriptionAr')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('descriptionAr')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'logo',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Logo')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            <img
              src={row.getValue('logo') || 'https://dummyimage.com/500x500.png'}
              className=' h-10 w-10 rounded-full'
            />
          </span>
        </div>
      )
    },
  }
]
