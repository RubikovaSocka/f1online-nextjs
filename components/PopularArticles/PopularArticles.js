import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { fetchPopularArticles } from "../../redux/actions/popularActions";
import Divider from "../Divider";
import Filler from "../Filler";
import SideSectionTitle from "../SideSectionTitle";
import ArticlesBox from "./ArticlesBox";

const Swipeable = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;

  > div {
    width: calc(100% - 10px);
    flex-shrink: 0;
    transition: margin 0.8s ease;

    &:first-of-type {
      margin-left: calc(100% * (-1) * ${(props) => props.selected});
    }
  }
`;
const Button = styled.button`
  font-family: HK Grotesk;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 33.33%;

  height: 100%;
  padding: 0;
  border: none;
  z-index: 2;
  position: relative;
  background: none;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 33.4%;
  position: absolute;
  bottom: -3px;
  left: 0;
  background-color: ${(props) => props.theme.TEXT_COLOR};
  z-index: 1;

  transition: margin 0.8s ease;

  margin-left: calc(33.33% * ${(props) => props.selected});
  height: 3px;
`;

const Buttons = styled.div`
  position: relative;
  width: calc(100% - 20px);
  height: 30px;
  margin-left: 10px;

  border-bottom: 3px solid ${(props) => props.theme.BASIC_LINE_COLOR};
`;

const config = {
  delta: 10, // min distance(px) before a swipe starts
  preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
  trackTouch: true, // track touch input
  //trackMouse: true, // track mouse input
  rotationAngle: 180,
};
const INTERVAL = 11000;

function PopularArticles() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isIntervalRunning, setIsIntervalRunning] = useState(true);

  const state = useSelector((state) => state.popular);
  const { isLoading, today, days, week } = state;

  const updateIndex = ({ change, cancel }) => {
    setIndex((prev) => (prev + change) % 3);
    cancel && setIsIntervalRunning(false);
  };

  const setIndexOnClick = (newIndex) => {
    setIndex(newIndex);
    setIsIntervalRunning(false);
  };

  useEffect(() => {
    if (today.length === 0) {
      dispatch(fetchPopularArticles());
    }
  }, []);

  useEffect(() => {
    let interval;
    isIntervalRunning &&
      (interval = setInterval(() => {
        updateIndex({ change: 1, cancel: false });
      }, INTERVAL));
    !isIntervalRunning && clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [isIntervalRunning]);

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex({ change: -1, cancel: true }),
    onSwipedRight: () => updateIndex({ change: 1, cancel: true }),
    ...config,
  });

  return (
    <>
      <SideSectionTitle title="Najčítanejšie" />
      <Divider height="5px" />
      <Buttons>
        <Overlay selected={index} />
        <Button onClick={() => setIndexOnClick(0)}>24 hodín</Button>
        <Button onClick={() => setIndexOnClick(1)}>3 dni</Button>
        <Button onClick={() => setIndexOnClick(2)}>7 dní</Button>
      </Buttons>
      <Divider height="10px" />
      {isLoading ? (
        [0, 1, 2, 3, 4].map((item, i) => (
          <Filler
            key={i}
            style={{ margin: "5px 0 5px 10px" }}
            height="40px"
            width="calc(100% - 20px)"
          />
        ))
      ) : (
        <Swipeable selected={index} {...handlers}>
          <ArticlesBox title="24 hodín" articles={today} />
          <ArticlesBox title="3 dni" articles={days} />
          <ArticlesBox title="7 dní" articles={week} />
        </Swipeable>
      )}
      <Divider height="10px" />
    </>
  );
}

export default PopularArticles;
