import Loadable from "react-loadable";
import Filler from "./Filler";

const AsyncPage = Loadable({
  loader: () => import("./ResultsLarge"),
  loading: Filler
});

export default AsyncPage;
