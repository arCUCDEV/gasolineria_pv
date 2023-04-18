document.addEventListener('DOMContentLoaded', () => {
    const estacionesDieselForm = document.getElementById('estacionesDiesel');
    const estacionesDiv = document.getElementById('estaciones');

  
    estacionesDieselForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const estacion1 = parseInt(e.target.elements.estacion1.value);
      const estacion2 = parseInt(e.target.elements.estacion2.value);
  
      if (estacion1 === estacion2) {
        alert('Por favor, selecciona dos estaciones diferentes para el servicio de diésel.');
        return;
      }
  
      // Crear estaciones de servicio
      estacionesDiv.innerHTML = '';
      for (let i = 1; i <= 6; i++) {
        const estacionDiv = document.createElement('div');
        estacionDiv.className = 'estacion';
        estacionDiv.dataset.id = i;
        estacionDiv.innerHTML = `
          <h3>Estación ${i}</h3>
          <p><strong>Diésel:</strong> ${i === estacion1 || i === estacion2 ? 'Sí' : 'No'}</p>
          <p><strong>Gasolina Magna:</strong> Sí</p>
          <p><strong>Gasolina Premium:</strong> Sí</p>
        `;
        estacionesDiv.appendChild(estacionDiv);
      }
    });
  });

  class Estacion {
    constructor(id, tieneDiesel) {
      this.id = id;
      this.tieneDiesel = tieneDiesel;
      this.capacidad = {
        diesel: tieneDiesel ? 650 : 0,
        magna: 650,
        premium: 650
      };
      this.vehiculosAtendidos = 0;
      this.ventaTotal = 0;
    }
  
    atenderVehiculo(vehiculo) {
        const tipoCombustible = ['diesel', 'magna', 'premium'][vehiculo.tipoCombustible - 1];
        const litrosDisponibles = this.capacidad[tipoCombustible];
        
        if (litrosDisponibles >= vehiculo.litrosSolicitados) {
          this.capacidad[tipoCombustible] -= vehiculo.litrosSolicitados;
          this.vehiculosAtendidos++;
          this.ventaTotal += vehiculo.litrosSolicitados * precios[tipoCombustible];
        } else {
          // Caso en que no se puede abastecer completamente al vehículo
          vehiculo.litrosSolicitados -= litrosDisponibles;
          this.capacidad[tipoCombustible] = 0;
          this.ventaTotal += litrosDisponibles * precios[tipoCombustible];
    
          // Agregar vehículo a la fila para que sea atendido por otra estación
          if (this.tieneDiesel) {
            filaDiesel.unshift(vehiculo);
          } else {
            filaMagnaPremium.unshift(vehiculo);
          }
        }
      }
    }
    
    const precios = {
      diesel: 22.45,
      magna: 21.99,
      premium: 22.86
    };
  
  
  class Vehiculo {
    constructor(tipoCombustible, litrosSolicitados) {
      this.tipoCombustible = tipoCombustible;
      this.litrosSolicitados = litrosSolicitados;
    }
  }
  
  const estaciones = [];
  
  // Crear estaciones de servicio y agregarlas al array
  for (let i = 1; i <= 6; i++) {
    const tieneDiesel = i === estacion1 || i === estacion2;
    const estacion = new Estacion(i, tieneDiesel);
    estaciones.push(estacion);
  }
  
  // Filas de vehículos
  const filaDiesel = [];
  const filaMagnaPremium = [];
  
  // Función para generar vehículos de manera aleatoria
  function generarVehiculos() {
    const numVehiculos = numeroAleatorio(1, 20);
    
    for (let i = 0; i < numVehiculos; i++) {
      const tipoCombustible = numeroAleatorio(1, 3);
      const litrosSolicitados = numeroAleatorio(1, 50);
      const vehiculo = new Vehiculo(tipoCombustible, litrosSolicitados);
  
      if (tipoCombustible === 1) {
        filaDiesel.push(vehiculo);
      } else {
        filaMagnaPremium.push(vehiculo);
      }
    }
  }
 
  
  // Función para atender vehículos en las estaciones de servicio
  function atenderVehiculos() {
    for (const estacion of estaciones) {
      // Atender vehículos en fila diésel
      if (filaDiesel.length > 0 && estacion.tieneDiesel) {
        const vehiculo = filaDiesel.shift();
        estacion.atenderVehiculo(vehiculo);
      }
    }
  
    for (const estacion of estaciones) {
      // Atender vehículos en fila magna/premium
      if (filaMagnaPremium.length > 0 && !estacion.tieneDiesel) {
        const vehiculo = filaMagnaPremium.shift();
        estacion.atenderVehiculo(vehiculo);
      }
    }
  }
  // Función para generar un número aleatorio en un rango
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
 
  // Intervalo para generar vehículos aleatoriamente
  const intervaloGeneracionVehiculos = setInterval(() => {
    if (estacionesVacias() && filaDiesel.length === 0 && filaMagnaPremium.length === 0) {
      clearInterval(intervaloGeneracionVehiculos);
    } else {
      generarVehiculos();
    }
  }, numeroAleatorio(1000, 10000)); // Intervalo de 1 a 10 segundos
  
  // Intervalo para atender vehículos en las estaciones de servicio
  const intervaloAtencionVehiculos = setInterval(() => {
    if (estacionesVacias() && filaDiesel.length === 0 && filaMagnaPremium.length === 0) {
      clearInterval(intervaloAtencionVehiculos);
    } else {
      atenderVehiculos();
    }
  }, 1000); // Intervalo de 1 segundo

function actualizarDOM() {
    const estacionesDiv = document.getElementById('estaciones');
    estacionesDiv.innerHTML = '';
    const ventaTotalDelDia = estaciones.reduce((total, estacion) => total + estacion.ventaTotal, 0);

  
    estaciones.forEach((estacion, index) => {
      const estacionDiv = document.createElement('div');
      estacionDiv.className = 'estacion';
  
      const titulo = document.createElement('h3');
      titulo.innerText = `Estación ${index + 1}${estacion.tieneDiesel ? ' (Diésel)' : ''}`;
      estacionDiv.appendChild(titulo);
  
      const vehiculosAtendidos = document.createElement('p');
      vehiculosAtendidos.innerText = `Vehículos atendidos: ${estacion.vehiculosAtendidos}`;
      estacionDiv.appendChild(vehiculosAtendidos);
  
      const ventaTotal = document.createElement('p');
      ventaTotal.innerText = `Venta total: $${estacion.ventaTotal.toFixed(2)} MXN`;
      estacionDiv.appendChild(ventaTotal);
  
      estacionesDiv.appendChild(estacionDiv);

      
    });
  }
  
  // Intervalo para actualizar el DOM con la información de las estaciones y vehículos atendidos
  const intervaloActualizacionDOM = setInterval(() => {
    if (estacionesVacias() && filaDiesel.length === 0 && filaMagnaPremium.length === 0) {
      clearInterval(intervaloActualizacionDOM);
    } else {
      actualizarDOM();
    }
  }, 1000); // Intervalo de 1 segundo
  
  function actualizarDOM() {
    const estacionesDiv = document.getElementById('estaciones');
    estacionesDiv.innerHTML = '';
  
    estaciones.forEach((estacion, index) => {
      const estacionDiv = document.createElement('div');
      estacionDiv.className = 'estacion';
  
      const titulo = document.createElement('h3');
      titulo.innerText = `Estación ${index + 1}${estacion.tieneDiesel ? ' (Diésel)' : ''}`;
      estacionDiv.appendChild(titulo);
  
      // Mostrar información de litros en la estación
      const litrosInfoDiv = document.createElement('div');
      litrosInfoDiv.className = 'litros-info';
      const litrosDiesel = document.createElement('p');
      litrosDiesel.className = 'litros-diesel';
      litrosDiesel.innerText = `Diésel: ${estacion.capacidad.diesel} litros`;
      const litrosMagna = document.createElement('p');
      litrosMagna.className = 'litros-magna';
      litrosMagna.innerText = `Magna: ${estacion.capacidad.magna} litros`;
      const litrosPremium = document.createElement('p');
      litrosPremium.className = 'litros-premium';
      litrosPremium.innerText = `Premium: ${estacion.capacidad.premium} litros`;
      litrosInfoDiv.appendChild(litrosDiesel);
      litrosInfoDiv.appendChild(litrosMagna);
      litrosInfoDiv.appendChild(litrosPremium);
      estacionDiv.appendChild(litrosInfoDiv);
  
      const vehiculosAtendidos = document.createElement('p');
      vehiculosAtendidos.innerText = `Vehículos atendidos: ${estacion.vehiculosAtendidos}`;
      estacionDiv.appendChild(vehiculosAtendidos);
  
      const ventaTotal = document.createElement('p');
      ventaTotal.innerText = `Venta total: $${estacion.ventaTotal.toFixed(2)} MXN`;
      estacionDiv.appendChild(ventaTotal);
  
      estacionesDiv.appendChild(estacionDiv);
    });
  }
  
// Función para verificar si todas las estaciones están vacías
function estacionesVacias() {
    return estaciones.every((estacion) => {
      return Object.values(estacion.capacidad).every((litros) => litros === 0);
    });
  }
  
  // Función para verificar si se deben detener la generación y atención de vehículos
  function detenerGeneracionAtencion() {
    if (estacionesVacias() && filaDiesel.length === 0 && filaMagnaPremium.length === 0) {
      clearInterval(intervaloGeneracionVehiculos);
      clearInterval(intervaloAtencionVehiculos);
      clearInterval(intervaloActualizacionDOM);
  
      // Mostrar cantidad de vehículos en lista de espera al final del proceso
      const resultadosDiv = document.getElementById('resultados');
      const vehiculosEspera = document.createElement('p');
      vehiculosEspera.innerText = `Cantidad de vehículos en lista de espera: ${cantidadVehiculosEspera}`;
      resultadosDiv.appendChild(vehiculosEspera);
    }
  }
  
  // Intervalo para verificar si se deben detener la generación y atención de vehículos
  const intervaloDetenerGeneracionAtencion = setInterval(() => {
    detenerGeneracionAtencion();
  }, 1000); // Intervalo de 1 segundo

  // Modificar la condición en el intervaloActualizacionDOM

  // Agregar evento submit al formulario de estaciones con diésel
  const estacionesDieselForm = document.getElementById('estacionesDiesel');
  estacionesDieselForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const estacion1 = parseInt(document.getElementById('estacion1').value, 10);
    const estacion2 = parseInt(document.getElementById('estacion2').value, 10);
  
    if (estacion1 !== estacion2) {
      estaciones[estacion1 - 1].tieneDiesel = true;
      estaciones[estacion2 - 1].tieneDiesel = true;
  
      // Deshabilitar y ocultar el formulario después de guardar la selección
      estacionesDieselForm.querySelectorAll('select, button').forEach((element) => {
        element.disabled = true;
      });
      estacionesDieselForm.style.display = 'none';
    } else {
      alert('Por favor, selecciona dos estaciones diferentes para el servicio de diésel.');
    }
  });