import SingleProduct from "./SingleProduct";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return (
    <div className="bg-[#0E0E0E] min-h-screen w-full">
      <SingleProduct productId={id} />
    </div>
  );
}