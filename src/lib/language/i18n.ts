import en from './en.json'
import kh from './kh.json'
import { useSyncExternalStore } from 'react'

export type TranslationValue = string | TranslationDictionary
export type TranslationDictionary = {
  [key: string]: TranslationValue
}

const translations = {
  en,
  kh,
} satisfies Record<string, TranslationDictionary>

export type LanguageCode = keyof typeof translations

type LanguageConfig = {
  code: LanguageCode
  direction: 'ltr' | 'rtl'
  fontFamily: string
  fontStack: string
  labels: Record<LanguageCode, string>
  translations: TranslationDictionary
}

export const defaultLanguage: LanguageCode = 'en'
export const languageStorageKey = 'wb_language'

const latinFontStack = "'WB Latin', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const khmerFontStack = "'WB Khmer', 'WB Latin', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const languages: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: 'en',
    direction: 'ltr',
    fontFamily: 'WB Latin',
    fontStack: latinFontStack,
    labels: {
      en: 'ENGLISH',
      kh: 'KHMER',
    },
    translations: translations.en,
  },
  kh: {
    code: 'kh',
    direction: 'ltr',
    fontFamily: 'WB Khmer',
    fontStack: khmerFontStack,
    labels: {
      en: 'ENGLISH',
      kh: 'ខ្មែរ',
    },
    translations: translations.kh,
  },
}

export const languageCodes = Object.keys(languages) as LanguageCode[]

const languageListeners = new Set<() => void>()
let activeLanguage: LanguageCode = defaultLanguage

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return Boolean(value && value in languages)
}

export function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return defaultLanguage

  const storedLanguage = window.localStorage.getItem(languageStorageKey)
  return isLanguageCode(storedLanguage) ? storedLanguage : defaultLanguage
}

export function getActiveLanguage() {
  return activeLanguage
}

export function getLanguageLabel(language: LanguageCode, activeLanguage: LanguageCode = getStoredLanguage()) {
  return languages[activeLanguage].labels[language]
}

export function getLanguageOptions(activeLanguage: LanguageCode = getStoredLanguage()) {
  return languageCodes.map((code) => ({
    code,
    label: getLanguageLabel(code, activeLanguage),
  }))
}

export function getTranslations(language: LanguageCode = getStoredLanguage()) {
  return languages[language].translations
}

export function translate(key: string, fallback = '', language: LanguageCode = getStoredLanguage()) {
  const value = key.split('.').reduce<TranslationValue | undefined>((currentValue, keyPart) => {
    if (!currentValue || typeof currentValue === 'string') return undefined
    return currentValue[keyPart]
  }, getTranslations(language))

  return typeof value === 'string' ? value : fallback
}

export function applyLanguage(language: LanguageCode) {
  const config = languages[language]
  activeLanguage = language

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(languageStorageKey, language)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language
    document.documentElement.dir = config.direction
    document.documentElement.dataset.language = language
    document.documentElement.style.setProperty('--app-font-family', config.fontStack)
  }

  return config
}

export function setLanguage(language: LanguageCode) {
  const config = applyLanguage(language)
  languageListeners.forEach((listener) => listener())
  return config
}

export function initLanguage() {
  return applyLanguage(getStoredLanguage())
}

function subscribeToLanguage(listener: () => void) {
  languageListeners.add(listener)
  return () => languageListeners.delete(listener)
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribeToLanguage, getActiveLanguage, () => defaultLanguage)

  return {
    language,
    languages,
    options: getLanguageOptions(language),
    setLanguage,
  }
}

export function useTranslation() {
  const { language } = useLanguage()

  return {
    language,
    t: (key: string, fallback = '') => translate(key, fallback, language),
  }
}
