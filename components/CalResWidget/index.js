import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./CalResWidget"),
  loading: "Loading"
});

export default AsyncPage;
