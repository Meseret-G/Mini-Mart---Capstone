import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
} from 'reactstrap';
import './ProductCard.scss';
import { deleteProduct } from '../api/ProductData';

export default function ProductCard({ product, setProducts, admin }) {

  console.warn(admin, '12234');

  const initialState = {
    firebaseKey: '',
    name: '',
    image: '',
    description: '',
    price: '',
    uid: admin,
  };
  const [order, setOrder] = useState(initialState);
  const { key } = useParams();
  console.warn(admin, 'Meseret');
  useEffect(() => {
    if (key) {
      getSingleOrder(key).then((obj) => {
        setOrder({
          uid: obj.uid,
          date: obj.date,
          name: obj.name,
          image: obj.image,
          description: obj.description,
          price: obj.price,
        });
      });
    }
  }, []);

  const addToCart = () => {
    createOrder(order, product.firebaseKey).then(setOrder);
  };

  console.warn(order, 'products');

  const handleClick = (method) => {
    if (method === 'delete') {
      deleteProduct(product.firebaseKey).then((productArray) => setProducts(productArray));
    }
  };
  return (
    <div className="products">
      <Card style={{ width: '20rem' }} className="project-card">
        <CardImg
          src={product.image}
          alt="product image"
          className="product-image"
        />
        <CardBody>
          <CardTitle className="card-title">{product.name}</CardTitle>
          <CardSubtitle className="card-description">
            {product.description}
          </CardSubtitle>
          <CardTitle className="card-price">${product.price}</CardTitle>


          <Button className="add-cart" onClick={() => addToCart()}>
            Add To Cart
          </Button>

          {admin !== '' && (
            <Link className="link" to={`/edit/${product.firebaseKey}`}>
              Edit
            </Link>
          )}
          {admin !== '' && (
            <Button
              className="delete-product"
              type="button"
              onClick={() => handleClick('delete')}
              color="danger"
            >
              Delete
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setProducts: PropTypes.func.isRequired,
  admin: PropTypes.string,
};

ProductCard.defaultProps = {
  admin: '',
};
