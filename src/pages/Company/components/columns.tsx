import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'nameEn',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('English Name')} />
    )},
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('nameEn')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'nameAr',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Arabic Name')} />
    )},
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('nameAr')}
        </span>
      </div>
    ),
  },
  // {
  //   accessorKey: 'descriptionEn',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='English Description' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('descriptionEn')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'descriptionAr',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Arabic Description' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('descriptionAr')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'website',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Website' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('website')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'addressEn',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='English Address' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('addressEn')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'addressAr',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Arabic Address' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('addressAr')}
  //       </span>
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'categories',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Categories')} />
    )},
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {(row.getValue('categories') as string[])?.join(', ')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'logo',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Logo')} />
    )},
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <img
          src={row.getValue('logo') || 'https://dummyimage.com/500x500.png'}
          alt={row.getValue('nameEn') || 'Logo'}
          className='h-10 w-10 rounded-full'
        />
      </div>
    ),
  },
]
