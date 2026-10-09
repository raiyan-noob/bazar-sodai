import ProductGrid from "../../shared/ProductGrid";

const ProductSection = ({ title, marker, markerClass, products }) => {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-1.5 text-lg font-bold">
        <span className={`text-sm ${markerClass}`}>{marker}</span>
        {title}
      </h2>
      <ProductGrid products={products} />
    </section>
  );
};
//test
export default ProductSection;