/**
 * Envuelve contenido con una animación de aparición (CSS puro, ver index.css).
 * No depende de JavaScript para funcionar: si algo falla, el contenido
 * de todas formas es visible.
 */
export default function FadeUp({ children, className = "", style = {} }) {
  return (
    <div className={`mws-fade-up ${className}`} style={style}>
      {children}
    </div>
  );
}
