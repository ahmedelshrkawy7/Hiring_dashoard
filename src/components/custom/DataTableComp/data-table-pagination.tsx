import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";


interface DataTablePaginationProps {
  meta: {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export function DataTablePagination({ meta, onPageChange, onPageSizeChange }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: String(page) })
  }

  const handlePageSizeChange = (size: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      pageSize: String(size),
    })
  }

  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
        {meta?.totalItems} {t("row")} {t("total")}.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>{t("Rows per page")}</p>
          <Select
            value={`${meta?.pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange(Number(value)); // Pass new size

              handlePageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={meta?.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          {t("Page")} {meta?.currentPage} of {meta?.totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(1)}
            disabled={meta?.currentPage === 1}
          >
            <span className='sr-only'>{t("Go to first page")}</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta?.currentPage - 1)}
            disabled={meta?.currentPage === 1}
          >
            <span className='sr-only'>{t("Go to previous page")}</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(meta?.currentPage + 1)}
            disabled={meta?.currentPage === meta?.totalPages}
          >
            <span className='sr-only'>{t("Go to next page")}</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(meta?.totalPages)}
            disabled={meta?.currentPage === meta?.totalPages}
          >
            <span className='sr-only'>{t("Go to last page")}</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
