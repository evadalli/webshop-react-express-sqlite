export default function ProductCard({ product }) {
  return (
    <>
      <ul>
        <li>{product.id}</li>
        <li>{product.name}</li>
        <li>{product.price}</li>
      </ul>
    </>
  );
}
