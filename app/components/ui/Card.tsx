import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  hover?: boolean
}

export function Card({
  variant = 'default',
  hover = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white rounded-xl shadow-card border border-gray-100',
    elevated: 'bg-white rounded-xl shadow-lg border border-gray-100',
    outlined: 'bg-white rounded-xl border-2 border-gray-200',
  }

  const hoverStyles = hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''

  return (
    <div className={`${variantStyles[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 flex gap-2 justify-end ${className}`} {...props}>
      {children}
    </div>
  )
}
