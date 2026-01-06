import React from 'react'
import { useFormContext } from 'react-hook-form'
function FormInput({type,placeholder,name,}) {
    const {register,formState:{errors}} = useFormContext()
    return (
         <div className="relative">
            <input
              type={type}
              placeholder={placeholder}
              {...register(name)}
              className={`
                w-full px-6 py-4
                bg-white/10 backdrop-blur-md
                border rounded-xl
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-purple-500/50
                focus:border-purple-400
                transition-all duration-300 text-lg
                ${errors[name] ? 'border-red-500/70' : 'border-white/20'}
              `}
            />
            {errors[name] && (
              <p className="mt-2 text-sm text-red-400 text-left">{errors[name].message}</p>
            )}
          </div>
    )
}

export default FormInput
