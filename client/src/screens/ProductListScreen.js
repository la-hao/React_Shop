import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function ProductListScreen(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant="danger">{error}</MessageBox>
                        : (
                            <div className="row center">
                                {products.map(item => {
                                    return <Product key={item._id} product={item} />
                                })}
                            </div>
                        )
            }
        </div>
    );
}

export default ProductListScreen;