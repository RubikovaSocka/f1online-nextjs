import Loadable from "react-loadable";
import Filler from "./Filler";

const AsyncPage = Loadable({
  loader: () => import("./PostsBlock"),
  loading: () => <Filler />,
});

export default AsyncPage;
