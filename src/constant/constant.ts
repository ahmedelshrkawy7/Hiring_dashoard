interface Option {
  value: string
  label: string
}

export const userTypes = [
  {
    value: 'individual',
    label: 'individual',
  },
  {
    value: 'company',
    label: 'company',
  },
]
export const userStatus = [
  {
    value: 'active',
    label: 'active',
  },
  {
    value: 'inactive',
    label: 'inactive',
  },
  {
    value: 'deleted',
    label: 'deleted',
  },
]
export const userRoles = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'seller',
    label: 'seller',
  },
  {
    value: 'user',
    label: 'user',
  },
  {
    value: 'superadmin',
    label: 'super admin',
  },
]

export const gender = [
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
]

export const invoiceStatus = [
  {
    value: 'active',
    label: 'active',
  },
  {
    value: 'inactive',
    label: 'inactive',
  },
]
export const selectOptions: Option[] = [
  { value: 'NationalID', label: 'National ID' },
  { value: 'passport', label: 'Passport' },
  { value: 'driverLicense', label: 'Driver License' },
]
export const companyCategories = [
  { value: 'technology', label: 'Technology' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'retail', label: 'Retail' },
  { value: 'food_beverage', label: 'Food and Beverage' },
  { value: 'finance', label: 'Finance' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'energy', label: 'Energy' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'e_commerce', label: 'E-commerce' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'travel_hospitality', label: 'Travel and Hospitality' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'construction', label: 'Construction' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'consumer_electronics', label: 'Consumer Electronics' },
  { value: 'software', label: 'Software' },
  { value: 'media', label: 'Media' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'education', label: 'Education' },
]
