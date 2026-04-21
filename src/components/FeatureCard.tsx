import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="card card-hover p-6 group"
    >
      <div className="w-12 h-12 rounded-xl bg-theme-primary/10 flex items-center justify-center mb-4 group-hover:bg-theme-primary/15 transition-colors">
        <Icon className="w-6 h-6 text-theme-primary" />
      </div>
      <h3 className="font-semibold text-theme-text-primary mb-2">{title}</h3>
      <p className="text-sm text-theme-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}
