export type FocusArea = 'system_design' | 'dsa' | 'ai_ml' | 'behavioral'

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'cancelled'
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled'

export interface AvailabilitySlot {
  date: string        // "YYYY-MM-DD"
  time_slots: string[] // ["10:00", "11:00"]
  is_active: boolean
}

export interface BookingFormData {
  name: string
  email: string
  phone?: string
  slot_datetime: string   // ISO string
  focus_areas: FocusArea[]
  current_role?: string
  target_role?: string
  notes?: string
}

export interface BookingOrderResponse {
  merchant_order_id: string
  amount: number
  booking_id: number
}

export interface BookingConfirmData {
  merchant_order_id: string
  phonepe_transaction_id: string
}

export interface BookingDetail {
  id: number
  name: string
  email: string
  phone: string
  slot_datetime: string
  focus_areas: FocusArea[]
  current_role: string
  target_role: string
  notes: string
  amount: string
  payment_status: PaymentStatus
  session_status: SessionStatus
  meeting_link: string
  merchant_order_id: string
  created_at: string
}
