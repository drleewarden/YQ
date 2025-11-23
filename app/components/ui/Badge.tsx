import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ variant = 'primary', size = 'md', children, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    accent: 'bg-accent-light text-accent-dark',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={`inline-block font-semibold rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </span>
  )
}
