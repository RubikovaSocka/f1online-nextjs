import Loadable from "react-loadable";

const AsyncPage = Loadable({
  loader: () => import("./CalendarLarge"),
  loading: "Loading"
});

export default AsyncPage;
