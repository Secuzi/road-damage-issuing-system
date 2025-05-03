import React from 'react'

export default function Button({text, className}) {
    return (
        <button className={`btn border-none accent-color ${className}`}>
            {text}
        </button>
    )
}
