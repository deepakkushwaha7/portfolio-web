export type RoleType = 'contract' | 'fulltime' | 'advisory' | 'other'

export interface HireEnquiryFormData {
  name: string
  email: string
  company?: string
  role_type: RoleType
  budget_range?: string
  message: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
