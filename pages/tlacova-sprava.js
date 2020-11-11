import React, { useEffect } from "react";
import Router from "next/router";

export default function tlacovaSprava() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/tlacova-sprava") {
      Router.push("/clanky/585/tlacova-sprava");
    }
  }, []);
  return null;
}
