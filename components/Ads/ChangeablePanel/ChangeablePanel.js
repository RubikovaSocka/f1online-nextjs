import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import onClient from "../../../utils/onClient";
import onMobile from "../../../utils/onMobile";

const randomIndex = (totalElements) => {
  return Math.floor(Math.random() * totalElements);
};

const pickRandomBanner = (panels) => {
  let partner =
    window.innerWidth < 1024
      ? panels.m[randomIndex(panels.m.length)]
      : panels.pc[randomIndex(panels.pc.length)];

  let panelPick = partner.banners[randomIndex(partner.banners.length)];

  return {
    src: panelPick.src,
    link: panelPick.link,
  };
};

const recordShownToGA = (current, shownPanels, positionName) => {
  //Check if this panel has already been recorded to GA
  for (const panel in shownPanels) {
    if (current.link === panel.link && current.src === panel.src) {
      return false;
    }
  }
  ReactGA.event({
    category: "partnerShown",
    action: `shown-${window.innerWidth < 1024 ? "m" : "pc"}-${positionName}`,
    label: `${current.link}*${current.src}`,
    nonInteraction: true,
  });

  return true;
};

const recordClickToGA = (current, positionName) => {
  ReactGA.event({
    category: "partnerClicked",
    action: `click-${window.innerWidth < 1024 ? "m" : "pc"}-${positionName}`,
    label: `${current.link}*${current.src}`,
  });
};

function ChangeablePanel({ isVisible, panels, changeable, positionName }) {
  if (onClient()) {
    if (onMobile() && panels.m.length === 0) {
      return null;
    } else if (panels.pc.length === 0) {
      return null;
    }
  }

  const [shownPanels, setShownPanels] = useState([]);
  const [current, setCurrent] = useState({ src: "", link: "" });

  //INITIAL PICK
  useEffect(() => {
    const newPick = pickRandomBanner(panels);
    if (newPick.src !== current.src && newPick.link !== current.link) {
      setCurrent(newPick);
    }
  }, []);

  //OFF-SCREEN REPICK
  useEffect(() => {
    if (isVisible) {
      //If recorded, do not record in the future
      if (recordShownToGA(current, shownPanels, positionName)) {
        setShownPanels((prev) => [...prev, current]);
      }
    } else if (changeable) {
      const newPick = pickRandomBanner(panels);
      if (newPick.src !== current.src && newPick.link !== current.link) {
        setCurrent(newPick);
      }
    }
  }, [isVisible]);

  return (
    <div className="container">
      <a
        href={current.link}
        rel="noreferrer"
        target="_blank"
        onClick={() => recordClickToGA(current, positionName)}
      >
        <div className="panel">
          <img src={current.src} />
        </div>
      </a>
    </div>
  );
}

export default ChangeablePanel;
