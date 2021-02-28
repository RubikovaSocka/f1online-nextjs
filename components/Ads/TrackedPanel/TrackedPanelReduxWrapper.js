import { useSelector } from "react-redux";
import TrackedPanel from "./TrackedPanel";

function TrackedPanelReduxWrapper(props) {
  const state = useSelector((state) => state.panels);
  const { json, isLoading, probabilites, impressionsCounter } = state;
  const stateProps = {
    json: json,
    isLoading: isLoading,
    probabilites: probabilites,
  };
  if (!isLoading)
    return (
      <TrackedPanel
        topProps={props}
        stateProps={stateProps}
        impressionsCounter={impressionsCounter}
      />
    );
  return null;
}

export default TrackedPanelReduxWrapper;
