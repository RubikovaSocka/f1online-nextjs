import Loadable from "react-loadable";
import Filler from "./Filler";

const AsyncPage = Loadable({
  loader: () => import("./CalResWidget"),
  loading: Filler
});

export default AsyncPage;
