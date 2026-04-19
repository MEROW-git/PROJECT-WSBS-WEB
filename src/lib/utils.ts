import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCompanyCode(companyName: string): string {
  const prefix = companyName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 4)
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}${random}`
}

export function formatPrice(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[\+]?[\d\s\-\(\)]{8,}$/.test(phone)
}
