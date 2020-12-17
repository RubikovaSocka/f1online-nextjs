const TYPES = {
  FETCH: "PRODUCTS_FETCH",
  FETCH_SUCCESS: "PRODUCTS_FETCH_SUCCESS",
  FETCH_FAIL: "PRODUCTS_FETCH_FAIL",
};

const fetchProducts = () => ({
  type: TYPES.FETCH,
});

const setProducts = (products) => ({
  type: TYPES.FETCH_SUCCESS,
  products,
});

const setProductsError = (error) => ({
  type: TYPES.FETCH_FAIL,
  error,
});

export { TYPES, fetchProducts, setProducts, setProductsError };
