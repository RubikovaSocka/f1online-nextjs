const TYPES = {
  FETCH: "CATEGORIES_FETCH",
  SUCCESS: "CATEGORIES_SUCCESS",
  FAIL: "CATEGORIES_FAIL"
};

const fetchCategories = () => ({
  type: TYPES.FETCH
});

const setCategories = json => ({
  type: TYPES.SUCCESS,
  json
});

const setCategoriesError = error => ({
  type: TYPES.FAIL,
  error
});

export { TYPES, fetchCategories, setCategories, setCategoriesError };
