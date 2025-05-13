import React from 'react'

export default function Button({text, className}) {
    return <button className={`btn btn-accent ${className}`}>{text}</button>
}
