export default function Message({ mensaje, esPropio }) {
  const fecha = new Date(mensaje.fecha_hora);
  const horaFormateada = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  return (
    <div style={{ textAlign: esPropio ? "right" : "left" }}>
      <p>
        {!esPropio && <strong>{mensaje.username}: </strong>}
        {mensaje.contenido}
      </p>
      <small>{horaFormateada}</small>
    </div>
  );
}
