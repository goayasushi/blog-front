import { FC, memo, useEffect, useState } from "react";
import { Header } from "../organisms/Header";
import { client } from "../../libs/client";
import parse, { DOMNode, Element as DomElement } from "html-react-parser";
import { Footer } from "../organisms/Footer";

type Blog = {
  category: {
    createdAt: string;
    id: string;
    name: string;
    publishedAt: string;
    revisedAt: string;
    updatedAt: string;
  };
  content: string;
  createdAt: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  updatedAt: string;
};

export const ArticleList: FC = memo(() => {
  const [blogs, setBlogs] = useState<Array<Blog>>([]);

  useEffect(() => {
    client
      .get({
        endpoint: "blogs",
      })
      .then((res) => {
        console.log(res.contents);
        setBlogs(res.contents);
      })
      .catch((err) => console.log(err));
  }, []);

  const transform = (node: DOMNode) => {
    if (node.type === "tag" && (node as DomElement).name === "img") {
      const imgNode = node as DomElement;
      return (
        <img
          src={imgNode.attribs.src}
          alt={imgNode.attribs.alt}
          style={{ width: "100%", height: "auto", border: "2px solid red" }}
        />
      );
    }
  };

  return (
    <>
      <Header />
      <p>疎通確認</p>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <p>{blog.title}</p>
          <img src={blog.eyecatch.url} style={{ width: 600, height: 300 }} />
          <br />
          <div>{parse(blog.content, { replace: transform })}</div>
        </div>
      ))}
      <Footer />
    </>
  );
});
