import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {registerSchema} from '../schemas/authSchema'

export default function useRegisterForm() {
    return useForm({
        resolver: zodResolver(registerSchema),
    })
}
