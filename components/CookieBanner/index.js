import Loadable from "react-loadable";
import Filler from "../Filler";

const AsyncPage = Loadable({
  loader: () => import("./CookieBanner"),
  loading: () => <Filler />,
});

export default AsyncPage;
