import clsx from "clsx";
import styles from "../styles.module.css";

export default function Message({ mensaje, esPropio }) {
  const fecha = new Date(mensaje.fecha_hora);
  const horaFormateada = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  return (
    <div className={clsx(styles.mensaje, { [styles.propio]: esPropio, [styles.ajeno]: !esPropio })}>
      <p>
        {!esPropio && <strong>{mensaje.username}: </strong>}
        {mensaje.contenido}
      </p>
      <small>{horaFormateada}</small>
    </div>
  );
}
