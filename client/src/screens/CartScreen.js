import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../actions/cartActions';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number((props.location.search).split('=')[1]) : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addCartItem(productId, qty));
        }
    }, [dispatch, productId, qty]);

    return (
        <div>
            <h1>Cart Screen</h1>
        </div>
    );
}

export default CartScreen;