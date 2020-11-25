import Loadable from "react-loadable";
import Filler from "./Filler";

const AsyncPage = Loadable({
  loader: () => import("./CalendarLarge"),
  loading: () => <Filler />
});

export default AsyncPage;
