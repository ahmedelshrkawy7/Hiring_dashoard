import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export const FormTextField = ({
  form,
  name,
  label,
  placeholder,
  type,
}: {
  type?: any
  form: any
  name: string
  label: string
  placeholder: string
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type ? type : 'text'}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

// Reusable textarea field
export const FormTextAreaField = ({
  form,
  name,
  label,
  placeholder,
}: {
  form: any
  name: string
  label: string
  placeholder: string
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            onChange={(e) => {
              const value = e.target.value
              if (value.endsWith(',')) {
                field.onChange(value.split(',').map((item) => item.trim()))
              } else {
                field.onChange([value,''])
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
