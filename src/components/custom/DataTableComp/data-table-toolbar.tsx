import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { priorities, statuses } from '@/pages/tasks/data/data'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  actionBtn: any
}

export function DataTableToolbar<TData>({
  table,
  actionBtn,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  console.log('table', isFiltered)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2 mr-2'>
        {/* <Input
          className='h-8 w-[150px] lg:w-[250px]'
          placeholder='Filter tasks...'
          // value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          // value={''}
          // onChange={(event) =>
          //   table.getColumn('title')?.setFilterValue(event.target.value)
          // }
        /> */}
        {/* <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Priority'
              options={priorities}
            />
          )}
        </div> */}
        {/* {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )} */}
        <DataTableViewOptions table={table} />
      </div>
      {actionBtn}
    </div>
  )
}
