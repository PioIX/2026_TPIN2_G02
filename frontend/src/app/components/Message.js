export default function Message({ mensaje, esPropio }) {
  return (
    <div style={{ textAlign: esPropio ? "right" : "left" }}>
      <p>{mensaje.contenido}</p>
      <p>{mensaje.fecha_hora}</p>
    </div>
  );
}
