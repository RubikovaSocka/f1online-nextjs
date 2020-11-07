import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./ResultsWidget"),
  loading: "Loading"
});

export default AsyncPage;
