import Loadable from "react-loadable";
import Filler from "../../Filler";

const AsyncPage = Loadable({
  loader: () => import("./TrackedPanel"),
  loading: () => <Filler />,
});

export default AsyncPage;
