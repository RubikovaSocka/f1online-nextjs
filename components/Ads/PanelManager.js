import React from "react";

export default function PanelManager() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const response = await axios({
    method: "get",
    url: "https://wpadmin.f1online.sk/wp-content/uploads/parts.json"
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });

  return {
    props: {
      teamsData: response.data
    }
  };
}
