import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./ResultsLarge"),
  loading: "Loading"
});

export default AsyncPage;
