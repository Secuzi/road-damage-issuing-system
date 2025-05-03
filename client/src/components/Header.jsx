import React from 'react'
import ThemeController from './ThemeController'

export default function Header({children}) {
    return (
        <header className="flex flex-row justify-around itnems-center p-8">
            <h2 className="flex-[.2] text-lg font-bold">RoadBusters</h2>
            <nav className="flex-[.5]">{children}</nav>
            <ThemeController />
        </header>
    )
}
