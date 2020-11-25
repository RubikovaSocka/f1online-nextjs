import Loadable from "react-loadable";

function Filler() {
  return <div>Načítavam diskusiu</div>;
}

const AsyncPage = Loadable({
  loader: () => import("./DiskusnyBox"),
  loading: () => <Filler />,
});

export default AsyncPage;
