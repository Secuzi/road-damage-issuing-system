import React from 'react'
import Button from './Button'

export default function Introduction() {
    return (
        <div className="flex-[.5] mt-15">
            <h2 className="text-2xl font-bold my-8">
                RoadBusters: Enhancing Road Maintenance and Public Participation
            </h2>
            <p className="text-sm my-4">
                RoadBusters is a digital platform designed to facilitate the
                reporting, management, and resolution of road damage issues in
                urban and rural areas. The system enables citizens, local
                authorities, and contractors to efficiently track and address
                issues related to road conditions, including potholes, cracks,
                and other structural impairments. It streamlines the process of
                documenting road damage by allowing users to submit reports with
                relevant information such as the location, severity, and images
                of the damage. Through an easy-to-use interface, the system
                provides transparency and enhances the responsiveness of
                municipal departments, ultimately contributing to safer and
                smoother roads for the community. The goal is to improve the
                speed and accuracy of road repairs while promoting public
                participation in maintaining road infrastructure.
            </p>
            <Button text="Login as Guest" />
        </div>
    )
}
