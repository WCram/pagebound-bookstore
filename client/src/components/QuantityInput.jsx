export default function QuantityInput({ value, onChange, min = 1, max }) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(max ? Math.min(max, value + 1) : value + 1);

  return (
    <div className="quantity-input">
      <button type="button" onClick={decrement} aria-label="Decrease quantity">
        &minus;
      </button>
      <span>{value}</span>
      <button type="button" onClick={increment} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
