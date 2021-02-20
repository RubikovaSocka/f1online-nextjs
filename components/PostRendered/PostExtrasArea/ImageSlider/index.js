import Loadable from "react-loadable";
import Filler from "../../Filler";

const AsyncPage = Loadable({
  loader: () => import("./ImageSlider"),
  loading: () => <Filler height="50px" width="100%" />,
});

export default AsyncPage;
