import { useEffect, useState } from "react";
import makeThreads from "../funs/makeThreads";
import Item from "./Item";

export default function Comments() {
  //REMOVE
  const [json, setJson] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      return await fetch(
        `https://wpadmin.f1online.sk/wp-content/uploads/10.json`
      )
        .then((res) => res.json())
        .then((res) => setJson(res));
    };

    fetchProducts();
  }, []);
  if (!json) return null;
  const posts = makeThreads(json.post_stream.posts);
  return (
    <div>
      {posts.map((item, index) => {
        if (index > 0) return <Item key={index} {...item} level={0} />;
      })}
    </div>
  );
}
