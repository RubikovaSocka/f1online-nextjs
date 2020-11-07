import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./HeaderRePanel"),
  loading: "Loading"
});

export default AsyncPage;
