import { useEffect } from "react";
import EmbedContainer from "react-oembed-container";
import parse from "html-react-parser";
import EmbedExorcist from "../EmbedExorcist";

import styled from "styled-components";
import { Fragment } from "react";

import onClient from "../../utils/onClient";
import { POSITION } from "../Ads/positions";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import BContainer from "../../components/BContainer";

import ReactGA from "react-ga";
import Divider from "../Divider";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px 25px 20px;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }

  color: ${(props) => props.fgColor};
  background-color: ${(props) => props.bgColor};
  font-family: HK Grotesk;
  font-size: 14px;

  img {
    margin: 0;

    width: auto;
    height: 50px;
    @media only screen and (min-width: 1024px) {
      margin-left: 15px;
      height: 60px;
    }
  }
  a {
    color: ${(props) => props.fgColor};
    display: flex;
  }
`;

const Message = styled.span`
  color: white;
  text-align: center;
  margin: 0;
  font-weight: 600;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleDiv = styled(EmbedExorcist)`
  font-family: "HK Grotesk";
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  overflow: hidden;
  overflow: visible; /*updated to show banners*/

  p {
    padding: 3px 0;
    margin: 8px 0;
  }
  a {
    text-decoration: none;
    color: #e10600;
  }

  p:first-of-type {
    font-weight: 600;
    margin-top: 20px;
  }
`;

const CarImage = styled.img`
  width: 100%;
`;

const NR_PARS_BET_ADS = 4;

const GPs = [
  {
    tagID: 401,
    bgColor: "#0597f2",
    fgColor: "#ffffff",
    link: "https://www.digislovakia.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/logo-digi-blackbg.png",
    partnerName: "DIGI SLOVAKIA",
    gpName: "VC Bahrajnu",
    partnerNameGA: "DIGI",
    gpNameGA: "VC-Bahrajnu-2021",
  },
  {
    tagID: 413,
    bgColor: "#6f3ba0",
    fgColor: "#ffffff",
    link: "https://www.swan.sk/swan-internet",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/swan-logo-blackbg.png",
    partnerName: "SWAN a jeho rýchleho internetu",
    gpName: "VC Emilia Romagna",
    partnerNameGA: "SWAN",
    gpNameGA: "VC-Emilia-Romagna-2021",
  },
  {
    tagID: 415,
    bgColor: "#0597f2",
    fgColor: "#ffffff",
    link: "https://bonipo.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/logo-boniposk.png",
    partnerName: "Bonipo.sk",
    gpName: "VC Portugalska",
    partnerNameGA: "Bonipo.sk",
    gpNameGA: "VC-Portugalska-2021",
  },
  {
    tagID: 425,
    bgColor: "#1f1f1f",
    fgColor: "#ffffff",
    link: "https://egopower.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/ego-logo-blackbg.png",
    partnerName: "EGO POWER+, ktorého produkty nájdete na egopower.sk",
    gpName: "VC Španielska",
    partnerNameGA: "EGO POWER+",
    gpNameGA: "VC-Španielska-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-angle.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-side.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-angle-rear.jpg",
    ],
  },
  {
    tagID: 431,
    bgColor: "#234889",
    fgColor: "#ffffff",
    link: "https://nabbi.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-bluebg.png",
    partnerName: "nabbi.sk, najformulovejšieho eshopu s nábytkom na Slovensku",
    gpName: "VC Monaka",
    partnerNameGA: "nabbi.sk",
    gpNameGA: "VC-Monaka-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-front-angle.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-side.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-rear-angle.jpg",
    ],
  },
  {
    tagID: 434,
    bgColor: "#1f1f1f",
    fgColor: "#ffffff",
    link: "https://egopower.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/ego-logo-blackbg.png",
    partnerName:
      "EGO POWER+, ktorého formulovo-vyladenú záhradnú techniku nájdete na egopower.sk",
    gpName: "VC Azerbajdžanu",
    partnerNameGA: "EGO POWER+",
    gpNameGA: "VC-Azerbajdžanu-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-angle.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-side.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/ego-power-angle-rear.jpg",
    ],
  },
  {
    tagID: 447,
    bgColor: "#234889",
    fgColor: "#ffffff",
    link: "https://nabbi.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-bluebg.png",
    partnerName: "nabbi.sk, najformulovejšieho eshopu s nábytkom na Slovensku",
    gpName: "VC Monaka",
    partnerNameGA: "nabbi.sk",
    gpNameGA: "VC-Monaka-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-front-angle.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-side.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/nabbi-rear-angle.jpg",
    ],
  },
  {
    tagID: 451,
    bgColor: "#424243",
    fgColor: "#ffffff",
    link: "https://fingo.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/fingo-logo-dark.png",
    partnerName: "FinGO.sk, experta na osobné financie, hypotéky a poistenie",
    gpName: "VC Štajerska",
    partnerNameGA: "FinGO.sk",
    gpNameGA: "VC-Stajerska-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/fingo-image01e.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/fingo-image02e.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/fingo-image03e-1.jpg",
    ],
  },
  {
    tagID: 440,
    bgColor: "#000b8d",
    fgColor: "#ffffff",
    link: "https://redbull.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/Red-Bull-Logo.png",
    partnerName: "Red Bullu, opory slovenských formulových fanúšikov",
    gpName: "VC Rakúska",
    partnerNameGA: "Red Bull",
    gpNameGA: "VC-Rakuska-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/q7rk0y3hxhebvywbpx3b.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/red-bull-slovensko-01.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/red-bull-slovensko-03.jpg",
    ],
  },
  {
    tagID: 456,
    bgColor: "#ed1c24",
    fgColor: "#ffffff",
    link: "https://andreashop.sk/",
    logo: "https://wpadmin.f1online.sk/wp-content/uploads/andreashop-logo.png",
    partnerName:
      "ANDREASHOP.SK, rýchleho, výhodného a spoľahlivého eshopu nielen s elektronikou",
    gpName: "VC Veľkej Británie",
    partnerNameGA: "andreashop.sk",
    gpNameGA: "VC-Velkej-Britanie-2021",
    cars: [
      "https://wpadmin.f1online.sk/wp-content/uploads/andreashop01a.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/andreashop02a.jpg",
      "https://wpadmin.f1online.sk/wp-content/uploads/andreashop03a.jpg",
    ],
  },
];

function AdsInjector({ inputHtml, adsDisallowed, tags }) {
  const nrPars = inputHtml.split("\n\n\n\n").length;
  let stripe = null;

  let index = 0;
  while (index < GPs.length && !tags.includes(GPs[index].tagID)) {
    index++;
  }
  if (index < GPs.length) {
    stripe = GPs[index];
  }
  //console.log(index, GPs[index]);
  const stripeClick = (stripe) => {
    // console.log("CLICKED", {
    //   category: "ARTICLE-STRIPE-CLICK",
    //   action: `Predsezónne-testy:-Bonipo.sk`,GPs
    //   label: `${window.location.href}`,
    //   nonInteraction: false,
    // });
    ReactGA.event({
      category: "ARTICLE-STRIPE-CLICK",
      action: `${stripe.gpNameGA}:${stripe.partnerNameGA}`,
      label: `${window.location.href}`,
      nonInteraction: false,
    });
  };

  useEffect(() => {
    if (stripe) {
      ReactGA.event({
        category: "ARTICLE-STRIPE-IMP",
        action: `${stripe.gpNameGA}:${stripe.partnerNameGA}`,
        label: `${window.location.href}`,
        nonInteraction: true,
      });
    }
  }, []);

  if (!adsDisallowed && nrPars > 5) {
    return inputHtml.split("\n\n\n\n").map((chunk, i) => (
      <Fragment key={i}>
        {parse(chunk)}
        <div>
          {onClient() && stripe && i === 0 && (
            <div>
              <Container bgColor={stripe.bgColor} fgColor={stripe.fg}>
                <a
                  target="_blank"
                  onClick={() => stripeClick(stripe)}
                  href={stripe.link}
                >
                  <Message>
                    {`Články k ${stripe.gpName} 2021 vznikajú vďaka podpore nášho
                    partnera ${stripe.partnerName}. Ďakujeme za podporu formulovej
                    komunity u nás!`}
                  </Message>
                </a>
                <a
                  target="_blank"
                  onClick={() => stripeClick(stripe)}
                  href={stripe.link}
                >
                  <img src={stripe.logo} />
                </a>
              </Container>
              {stripe.cars && (
                <a
                  target="_blank"
                  onClick={() => stripeClick(stripe)}
                  href={stripe.link}
                >
                  <CarImage
                    src={
                      stripe.cars[
                        Math.floor(Math.random() * stripe.cars.length)
                      ]
                    }
                  />
                </a>
              )}
            </div>
          )}
          <div>
            {onClient() && (i + 1) % NR_PARS_BET_ADS === 0 && i + 1 < nrPars && (
              <>
                <Divider height="10px" />
                <BContainer className="nomargins">
                  <TrackedPanel
                    type={TYPES.BASIC}
                    position={POSITION.CONTENT_ARTICLE}
                  />
                </BContainer>
                <Divider height="10px" />
              </>
            )}
          </div>
        </div>
      </Fragment>
    ));
  }
  return parse(inputHtml);
}

function PostContentArea({ article, adsDisallowed, tags }) {
  return (
    <EmbedContainer markup={article}>
      <ArticleDiv>
        <AdsInjector
          inputHtml={article}
          tags={tags}
          adsDisallowed={adsDisallowed}
        />
      </ArticleDiv>
    </EmbedContainer>
  );
}

export default PostContentArea;
