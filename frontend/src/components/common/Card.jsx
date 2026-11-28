function Card({ children, className = "" }) {
  return (
    <div className={`bg-card border border-border
      rounded-3xl p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;