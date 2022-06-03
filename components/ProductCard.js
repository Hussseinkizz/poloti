import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../store/store';

const ProductCard = ({ product }) => {
  const { image, name, price, slug } = product;
  const {
    state: { darkMode },
  } = useStore();

  return (
    <>
      <div
        className={`card background-gray-100 ${
          darkMode && 'background-gray-800 color-white'
        }`}
      >
        {/* card image & product link */}
        <Link href={`/product/${slug}`}>
          <a className="image-link">
            <Image src={image} alt={name} className="card-image" title={name} />
          </a>
        </Link>
        <div className="card-content">
          {/* card product name */}
          <h3 className="text-align-left margin-top-2">{name}</h3>
          <div className="card-footer flex-row align-items-center margin-top-4">
            {/* card product price */}
            <h4>${price}</h4>
            {/* card action button */}
            <button
              className={`button color-yellow background-gray-100 ${
                darkMode && 'background-gray-700'
              }`}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
