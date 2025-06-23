import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../contexts";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        
        if (data && data.id) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading product details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{product.rating} rating</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-green-600 ml-2">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
