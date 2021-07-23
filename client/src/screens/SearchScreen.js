import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { catProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import queryString from "query-string";
import Rating from "../components/Rating";

function SearchScreen(props) {
  const {
    pageNumber = "",
    category = "all",
    name = "all",
    min = 0,

    max = 0,
    rating = 0,
    order = "",
  } = queryString.parse(props.location.search);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, count } = productList;
  const {
    loading: loadingCat,
    error: errorCat,
    categories,
  } = useSelector((state) => state.productCat);

  useEffect(() => {
    dispatch(catProduct());
  }, [dispatch]);

  useEffect(() => {
    console.log(pageNumber);
    dispatch(
      listProducts({
        pageNumber,
        category: category !== "all" ? category : "",
        name: name !== "all" ? name : "",
        rating,
        order,
        min,
        max,
      })
    );
  }, [category, dispatch, max, min, name, order, pageNumber, rating]);

  const getFilterUrl = (filter) => {
    const pageNumber = filter.pageNumber || 1;
    const categoryFilter = filter.category
      ? filter.category
      : category === ""
      ? "all"
      : category;
    const nameFilter = filter.name ? filter.name : name === "" ? "all" : name;
    const ratingFilter = filter.rating || rating;
    const minFilter = filter.min || min;
    const maxFilter = filter.max || max;
    const sortOrder = filter.order
      ? filter.order
      : order === ""
      ? "newest"
      : order;

    return `/search?name=${nameFilter}&category=${categoryFilter}&min=${minFilter}&max=${maxFilter}&rating=${ratingFilter}&order=${sortOrder}&pageNumber=${pageNumber}`;
  };
  const filterPrice = [
    { min: 1, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 1000 },
  ];

  const orderHandler = (e) => {
    props.history.push(getFilterUrl({ order: e.target.value }));
  };

  return (
    <div>
      <div className="row">
        <div>{loading ? <LoadingBox /> : `${count} results`}</div>
        <div>
          Sort By{" "}
          <select value={order} onChange={(e) => orderHandler(e)}>
            <option value="newest">Newest Products</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="rating">Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col filter">
          <div>
            <ul>
              <li>
                <h1>Department</h1>
              </li>
              {loadingCat ? (
                <div>
                  <LoadingBox></LoadingBox>
                </div>
              ) : errorCat ? (
                <MessageBox variant="danger">{errorCat}</MessageBox>
              ) : (
                <>
                  <li>
                    <Link
                      to={getFilterUrl({ category: "all" })}
                      className={category === "all" ? "active" : ""}
                    >
                      All
                    </Link>
                  </li>
                  {categories.map((c, index) => (
                    <li key={index}>
                      <Link
                        to={getFilterUrl({ category: c })}
                        className={category === c ? "active" : ""}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <h1>Price</h1>
              </li>
              <li>
                <Link
                  to={getFilterUrl({ min: "0", max: "0" })}
                  className={+min === 0 && +max === 0 ? "active" : ""}
                >
                  All
                </Link>
              </li>
              {filterPrice.map((p, index) => (
                <li key={index}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={+min === p.min && +max === p.max ? "active" : ""}
                  >
                    ${p.min} - ${p.max}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <h1>Avg. Customer Reviews</h1>
              </li>

              {[...Array(4).keys()].reverse().map((r, index) => (
                <li key={index}>
                  <Link
                    to={getFilterUrl({ rating: r + 1 })}
                    className={+rating === r + 1 ? "active" : ""}
                  >
                    <Rating rating={r + 1} filter></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-30 col-2">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : products.length <= 0 ? (
            <div className="row center">
              <MessageBox>No Product Found</MessageBox>
            </div>
          ) : (
            <>
              <div className="row center">
                {products.map((item) => {
                  return <Product key={item._id} product={item} />;
                })}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((p) => (
                  <Link
                    key={p + 1}
                    to={getFilterUrl({ pageNumber: p + 1 })}
                    className={p + 1 === page ? "active" : ""}
                  >
                    {p + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
