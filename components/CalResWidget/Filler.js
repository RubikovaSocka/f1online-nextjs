import {
  WidgetContainer,
  Content,
  WidgetContent,
  Buttons
} from "./StyledComponents";
import SideSectionTitle from "../SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton";

function Filler() {
  return (
    <WidgetContainer>
      <SideSectionTitle title="Boxová tabuľa" />
      <WidgetContent>
        <Buttons>
          <SideWidgetButton title="Budúca VC" selected={true} />
          <SideWidgetButton
            title="Posledná VC"
            onClick={() => setSelectedWidget(WIDGETS.RACE)}
            selected={false}
          />
          <SideWidgetButton title="Šampionát" selected={false} />
        </Buttons>
        <Content loading />
      </WidgetContent>
    </WidgetContainer>
  );
}

export default Filler;
