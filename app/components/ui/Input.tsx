import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <input
        className={`
          w-full px-4 py-2.5 border-2 rounded-lg font-base
          transition-colors duration-200
          ${error ? 'border-danger bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-primary'}
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-10
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1 font-medium">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export function TextArea({ label, error, helperText, className = '', ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <textarea
        className={`
          w-full px-4 py-2.5 border-2 rounded-lg font-base resize-none
          transition-colors duration-200
          ${error ? 'border-danger bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-primary'}
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-10
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1 font-medium">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, error, helperText, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <select
        className={`
          w-full px-4 py-2.5 border-2 rounded-lg font-base
          transition-colors duration-200
          ${error ? 'border-danger bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-primary'}
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-10
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          appearance-none bg-white
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger text-sm mt-1 font-medium">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}
