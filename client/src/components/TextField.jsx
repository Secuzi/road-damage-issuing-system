import React from 'react'

export default function TextField({name, label, type, placeholder}) {
    return (
        <fieldset className="fieldset bg-transparent text-font-color">
            <legend className="fieldset-legend text-font-color">{label}</legend>
            <input
                type="text"
                className="input bg-white"
                placeholder={placeholder}
            />
        </fieldset>
    )
}
