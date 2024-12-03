import React from 'react'
import { SelectItemProps } from './SelectItem.types'
import './SelectItem.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectCompProps {
  options: { value: string ; label: string }[] // Dropdown options
  placeholder?: string // Placeholder text for the dropdown
  onValueChange: (value: string) => void // Callback to pass the selected value to the parent
  defaultValue?: string | number // Optional default value for selection
}

export const SelectComp: React.FC<SelectCompProps> = ({
  options,
  placeholder = 'Select an option', // Default placeholder if none is provided
  onValueChange,
  defaultValue = 'clear', // Default value for the select (can be set via props)
  ...props
}) => {
  // Handler for value changes
  const handleValueChange = (value: string) => {
    // Handle "clear" as a special case
    if (value == 'clear') {
      onValueChange('') // Treat "clear" as no selection
    } else {
      onValueChange(value) // Pass the selected value to the parent
    }
  }

  return (
    <Select
      {...props}
      defaultValue={String(defaultValue) as string}
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'clear'}>Select an option</SelectItem>
        {options?.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
