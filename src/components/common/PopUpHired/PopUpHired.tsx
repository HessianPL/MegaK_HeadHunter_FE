import React from "react";
import Swal from "sweetalert2";

function PopUpHired() {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  
  const alertConfirm = () => {
  swalWithBootstrapButtons.fire({
    title: 'Zostałeś zatrudniony?',
    text: "Po zatwierdzeniu utracisz dostęp do konta!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Tak, zatrudniony!',
    cancelButtonText: 'Nie, cofnij!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Gratulacje zatrudnienia!',
        'Od teraz nie możesz używać platformy.',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cofnięto',
        'Uff było blisko, powodzenia w dalszym szukaniu pracy :)',
        'error'
      )
    }
  })
}

  return (

    <button onClick={alertConfirm}>Zatrudniony</button>

  );
}

export default PopUpHired;
