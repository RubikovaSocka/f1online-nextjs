import { call, put } from "redux-saga/effects";
import fetchProducts from "../../apis/fetchProductsApi";
import { setProducts, setProductsError } from "../../actions/productsActions";

function* handleFetchProducts() {
  try {
    const productsData = yield call(fetchProducts);
    yield put(setProducts(productsData));
  } catch (err) {
    yield put(setProductsError(err.toString()));
  }
}

export default handleFetchProducts;
