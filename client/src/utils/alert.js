import Swal from 'sweetalert2'

export const showSuccessDialog = (
    title = 'Success',
    text = 'Action completed'
) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500,
    })
}

export const showErrorDialog = (
    title = 'Error',
    text = 'Something went wrong'
) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
}
