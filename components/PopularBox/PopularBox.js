import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxItem from "./BoxItem";
import SideSectionTitle from "../SideSectionTitle/SideSectionTitle";
import Divider from "../Divider";
import { fetchCategories } from "../../redux/actions/categoriesActions";
import TemporaryInfoPanel from "../TemporaryInfoPanel";

function PopularBox({ pickedSlug }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state.categories);
  const { isLoading, json, error } = state;

  useEffect(() => {
    !json && dispatch(fetchCategories());
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: "HK Grotesk" }}>
      <SideSectionTitle title="Kategórie" />
      <Divider height="10px" />
      {isLoading ? (
        <TemporaryInfoPanel
          loader
          margin="auto"
          height="230px"
          width="calc(100% - 20px)"
        />
      ) : error ? (
        error
      ) : (
        json.map((item, index) => {
          return <BoxItem key={index} {...item} pickedSlug={pickedSlug} />;
        })
      )}
    </div>
  );
}

export default PopularBox;
