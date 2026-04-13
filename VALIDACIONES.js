
document.getElementById('registroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let form = e.target;
  let valido = true;

  // Limpiar estados previos
  [...form.elements].forEach(el => el.classList.remove('is-invalid'));

  // Validar nombres (sin números)
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  ['nombreCompleto','nombre','segundoNombre','apellido','segundoApellido'].forEach(id=>{
    let campo = document.getElementById(id);
    if(campo.value && !soloLetras.test(campo.value)){
      campo.classList.add('is-invalid');
      valido = false;
    }
    if(campo.hasAttribute("required") && campo.value.trim() === ""){
      campo.classList.add('is-invalid');
      valido = false;
    }
  });

  // Validar correo
  let correo = document.getElementById('correo');
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regexCorreo.test(correo.value)){
    correo.classList.add('is-invalid');
    valido = false;
  }

  // Validar contraseña
  let pass = document.getElementById('password');
  let confirm = document.getElementById('confirmPassword');
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if(!regexPass.test(pass.value)){
    pass.classList.add('is-invalid');
    valido = false;
  }
  if(pass.value !== confirm.value || confirm.value === ""){
    confirm.classList.add('is-invalid');
    valido = false;
  }

  if(valido){
    Swal.fire({
      title: '¿Confirmar envío?',
      text: "¿Desea enviar el formulario?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Éxito!', 'Formulario enviado correctamente.', 'success');
        form.reset();
      }
    });
  } else {
    Swal.fire('Error', 'Hay campos incorrectos, revise los errores.', 'error');
  }
});
