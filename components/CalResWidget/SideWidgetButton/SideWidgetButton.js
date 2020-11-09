import styled from "styled-components";

const Arrow = styled.div`
  position: absolute;
  margin: auto;
  margin-top: -5px;
  margin-left: calc(50% - 52px);
  z-index: 5;
  width: 0px;
  height: 0px;
  bottom: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 5px solid transparent;
  transition: ease-in-out 0.2s;
`;

const Button = styled.button`
  width: 33.33%;
  position: relative;
  height: 33px;
  padding: 0;
  border: none;
  border-radius: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.TEXT_COLOR};
  transition: ease-in-out 0.2s;
  background-color: ${props => props.theme.WIDGET_UNSELECT_BACK};

  span {
    font-family: "HK Grotesk", "Source Sans Pro";
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 13px;
  }

  &:hover,
  &.selected {
    background-color: ${props => props.theme.WIDGET_SELECT_BACK};
    cursor: pointer;
    color: white;
  }

  &:hover ${Arrow}, &.selected ${Arrow} {
    border-bottom: 5px solid ${props => props.theme.PAGE_BACK_COLOR};
  }
`;

function SideWidgetButton({ selected, title, onClick }) {
  return (
    <Button className={selected ? "selected" : ""} onClick={onClick}>
      <span>{title}</span>
      <Arrow />
    </Button>
  );
}

export default SideWidgetButton;
