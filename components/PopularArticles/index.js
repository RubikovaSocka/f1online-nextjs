import Loadable from "react-loadable";
import Filler from "../Filler";

const AsyncPage = Loadable({
  loader: () => import("./PopularArticles"),
  loading: () => <Filler height="300px" width="100%" />,
});

export default AsyncPage;
