import React from 'react'

export default function Checkbox() {
    return (
        <fieldset className="fieldset ">
            <label className="label text-font-color">
                <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox  text-font-color"
                />
                Remember me
            </label>
        </fieldset>
    )
}
