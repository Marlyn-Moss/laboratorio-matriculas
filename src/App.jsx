import { useState } from "react";
import "./App.css";

function App() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [tipo, setTipo] = useState("REGULAR");

  const [matriculas, setMatriculas] = useState([]);

  const [mensaje, setMensaje] = useState("");

  function registrarMatricula(e) {
    e.preventDefault();

    // Validación
    if (nombre.trim() === "") {
      setMensaje("El nombre es obligatorio");
      return;
    }

    if (!correo.includes("@")) {
      setMensaje("Correo electrónico inválido");
      return;
    }

    if (Number(edad) < 16 || !edad) {
      setMensaje("La edad debe ser de al menos 16 años");
      return;
    }

    if (carrera === "") {
      setMensaje("Debe seleccionar una carrera");
      return;
    }

    // Cálculo del costo
    let subtotal = 150;

    // Aplicación de descuentos
    if (tipo === "BECADO") {
      subtotal = subtotal * 0.50;
    } else if (tipo === "NUEVO") {
      subtotal = subtotal * 0.90;
    } else if (tipo === "REGULAR") {
      subtotal = subtotal;
    }

    // Cálculo del IVA
    const iva = subtotal * 0.13;

    const total = subtotal + iva;

    // Crear matrícula
    const nuevaMatricula = {
      id: Date.now(),
      nombre,
      correo,
      edad,
      carrera,
      tipo,
      subtotal,
      iva,
      total
    };

    // Guardar matrícula
    const nuevasMatriculas = [
      ...matriculas,
      nuevaMatricula
    ];

    setMatriculas(nuevasMatriculas);

    localStorage.setItem(
      "matriculas",
      JSON.stringify(nuevasMatriculas)
    );

    // Notificación simulada
    alert(
      "Correo enviado a: " + correo +
      "\nMatrícula registrada correctamente."
    );

    // Mostrar resultado
    setMensaje(
      "Matrícula registrada. Total: $" +
      total.toFixed(2)
    );

    // Limpiar formulario
    setNombre("");
    setCorreo("");
    setEdad("");
    setCarrera("");
    setTipo("REGULAR");
  }

  return (
    <div className="contenedor">

      <h1>Sistema de Matrículas</h1>

      <p>
        Registro de estudiantes
      </p>

      <form onSubmit={registrarMatricula}>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <select
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
        >
          <option value="">
            Seleccione una carrera
          </option>
          <option value="Mecatrónica">
            Mecatrónica
          </option>
          <option value="Operaciones y Mantenimiento">
            Operaciones y Mantenimiento
          </option>
          <option value="Logística">
            Logística
          </option>
          <option value="Desarrollo de Software">
            Desarrollo de Software
          </option>
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="REGULAR">
            Regular
          </option>
          <option value="NUEVO">
            Nuevo ingreso
          </option>
          <option value="BECADO">
            Becado
          </option>
        </select>

        <button type="submit">
          Registrar matrícula
        </button>

      </form>

      {mensaje && (
        <p className="mensaje">{mensaje}</p>
      )}

      <h2>Estudiantes matriculados</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Tipo</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {matriculas.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.carrera}</td>
              <td>{m.tipo}</td>
              <td>${m.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;