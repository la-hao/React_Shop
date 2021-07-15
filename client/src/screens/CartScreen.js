import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartItem, removeCartItem } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number((props.location.search).split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addCartItem(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const onRemoveItem = (id) => {
        dispatch(removeCartItem(id));
    }

    const onCheckOut = () => {
        props.history.push('/login?returnURL=checkout');
    }

    return (
        <div className="container">
            <div className="row top">
                <div className="col-2">
                    <h1> Shopping Cart</h1>
                    {
                        cartItems.length <= 0 ?
                            <MessageBox>
                                <span>Cart is empty ! </span>
                                <Link to="/">Go shopping</Link>
                            </MessageBox>
                            :
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.product}>
                                        <div className="row cart-item">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}><h2>{item.name}</h2></Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addCartItem(item.product, Number(e.target.value)))}>
                                                    {item.countInStock > 0 ?
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )) : ''
                                                    }
                                                </select>
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                                <button type="button" onClick={() => onRemoveItem(item.product)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                    }
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                                    : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                </h2>
                            </li>
                            <li>
                                <button
                                    className="primary block"
                                    type="button"
                                    onClick={onCheckOut}
                                    disabled={cartItems.length > 0 ? false : true}
                                >Go to Checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;