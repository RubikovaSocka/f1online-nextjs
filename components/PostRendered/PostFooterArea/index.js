import Loadable from "react-loadable";
import Filler from "../../Filler";

const AsyncPage = Loadable({
  loader: () => import("./PostFooterArea"),
  loading: () => <Filler height="500px" width="100%" />,
});

export default AsyncPage;
