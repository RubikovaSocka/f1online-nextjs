import Loadable from "react-loadable";
import Filler from "../Filler";

const AsyncPage = Loadable({
  loader: () => import("./ResultsWidget"),
  loading: () => <Filler />,
});

export default AsyncPage;
