import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./QuickNews"),
  loading: "Loading"
});

export default AsyncPage;
