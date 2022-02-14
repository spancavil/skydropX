import Swal from 'sweetalert2';

export default function SwalAlert (error) {
    Swal.fire({
        title: "Ocurrió un error",
        text: error,
        icon: 'error',
        showConfirmButton: true,
        width: '400px'
    })
}