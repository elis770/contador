let contador = 0;
let motivoAlUsuario = document.getElementById('promtDeTitulo');
let numero = document.getElementById('numero');
let pidesubir = document.getElementById('mas');
let pidebajar = document.getElementById('menos');
let reseteo = document.getElementById('reseteo');
let guardar = document.getElementById('guardar');
let listaRegistros = document.getElementById('lista-registros');

// Cargar datos desde localStorage al cargar la página
window.addEventListener('load', () => {
  // Solicitar un nuevo motivo al cargar la página
  motivoAlUsuario.innerHTML = prompt('Ingrese un motivo para la cuenta:');

  // Cargar el último estado del contador
  const savedData = localStorage.getItem('contadorData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    contador = parsedData.numero; // Recuperar el contador
    updateData(); // Actualizar el DOM
  }

  // Cargar los registros previos
  const registrosGuardados =
    JSON.parse(localStorage.getItem('registros')) || [];
  registrosGuardados.forEach((registro) => {
    const item = document.createElement('li');
    item.textContent = `Motivo: ${registro.motivo} - Contador: ${registro.contador}`;
    listaRegistros.appendChild(item);
  });
});

pidesubir.addEventListener('click', () => {
  numero.style.backgroundColor = 'green';
  contador++;
  updateData();
});

pidebajar.addEventListener('click', () => {
  if (contador > 0) {
    numero.style.backgroundColor = 'red';
    contador--;
    updateData();
  }
});

reseteo.addEventListener('click', () => {
  contador = 0;
  updateData();
});

function bodyBuilderJSON() {
  return {
    'contador de': motivoAlUsuario.innerHTML,
    numero: contador,
  };
}

function updateData() {
  numero.textContent = contador;

  // Guardar el contador y el motivo en localStorage
  const dataToSave = {
    'contador de': motivoAlUsuario.innerHTML,
    numero: contador,
  };
  localStorage.setItem('contadorData', JSON.stringify(dataToSave));
}

guardar.addEventListener('click', () => {
  // Crear un nuevo registro
  const registro = document.createElement('li');
  registro.textContent = `Motivo: ${motivoAlUsuario.innerHTML} - Contador: ${contador}`;
  listaRegistros.appendChild(registro);

  // Guardar el registro en localStorage
  let registrosGuardados = JSON.parse(localStorage.getItem('registros')) || [];
  registrosGuardados.push({
    contador: contador,
    motivo: motivoAlUsuario.innerHTML,
  });
  localStorage.setItem('registros', JSON.stringify(registrosGuardados));

  // Mostrar mensaje con los resultados guardados
  alert(
    `Registro guardado:\nMotivo: ${motivoAlUsuario.innerHTML}\nContador: ${contador}`
  );

  // Reiniciar el contador y solicitar un nuevo motivo
  contador = 0; // Reiniciar el contador
  updateData(); // Actualizar el DOM
  motivoAlUsuario.innerHTML = prompt('Ingrese un nuevo motivo de la cuenta:'); // Solicitar nuevo motivo
});
