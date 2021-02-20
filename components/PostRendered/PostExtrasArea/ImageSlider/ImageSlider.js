import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Divider from "../../../Divider";
import styled from "styled-components";

const Hint = styled.span`
  font-family: HK Grotesk;
  font-size: 13px;
  display: block;
  text-align: right;
`;

const Arrow = styled.div`
  color: #e10600;
  background-color: #e10600;
  height: 100%;
  width: 2px;

  &::before {
    font-size: 18px;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    //color: white;
    content: "\f337";
    margin-left: -8px;
    margin-top: 10px;
  }
`;

const MyCustomHandle = () => <Arrow />;

export default function ImageSlider({ images }) {
  return (
    <>
      <Hint>Čiaru potiahnite doprava alebo doľava</Hint>
      {images.array.map((item, index) => (
        <>
          <ReactCompareSlider
            handle={<MyCustomHandle />}
            key={index}
            itemOne={
              <ReactCompareSliderImage
                src={item.img1}
                //srcSet="..."
                alt="Image one"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={item.img2}
                ///srcSet="..."
                alt="Image two"
              />
            }
          />
          <Divider height="10px" />
        </>
      ))}
    </>
  );
}
