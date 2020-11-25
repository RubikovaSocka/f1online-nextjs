import Loadable from "react-loadable";

function Filler() {
  return <div></div>;
}

const AsyncPage = Loadable({
  loader: () => import("./ReportBox"),
  loading: () => <Filler />,
});

export default AsyncPage;
