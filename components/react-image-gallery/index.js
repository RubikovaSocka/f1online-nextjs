import Loadable from "react-loadable";
import Filler from "./Filler";

const AsyncPage = Loadable({
  loader: () => import("./src/ImageGallery"),
  loading: () => <Filler />,
});

export default AsyncPage;
