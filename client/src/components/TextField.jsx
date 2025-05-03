import React from 'react'
import {useController} from 'react-hook-form'

export default function TextField({control, name, label, type, placeholder}) {
    const {
        formState: {errors},
    } = useController({control, name})
    return (
        <fieldset className="fieldset bg-transparent text-font-color">
            <legend className="fieldset-legend text-font-color">{label}</legend>
            {errors[name] && (
                <span className="error text-error">{errors[name].message}</span>
            )}
            <input
                {...control.register(name)}
                type={type}
                className="input"
                placeholder={placeholder}
            />
        </fieldset>
    )
}
