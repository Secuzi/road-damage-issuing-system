import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import loginSchema from '../schema/zod/loginSchema'

export default function useLoginForm() {
    return useForm({
        resolver: zodResolver(loginSchema),
    })
}
