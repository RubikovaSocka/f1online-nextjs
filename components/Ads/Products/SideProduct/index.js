import Loadable from "react-loadable";
import Filler from "../../../Filler";

const AsyncPage = Loadable({
  loader: () => import("./SideProduct"),
  loading: () => <Filler width="100%" height="300px" />,
});

export default AsyncPage;
