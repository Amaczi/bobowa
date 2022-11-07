// React & style imports
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { apiConnect } from "../../files/api/basic";
import styles from "./singlepost.module.css";

// Next.js imports
import { useRouter } from "next/router";
import Link from "next/link";

// Other imports
import { dangerousData } from "../../files/utils/basic";

// Defaults
const DEFAULT_IMAGE = "/placeholder169.png";

export default function Post() {
  const [post, setPostData] = useState();
  const [image, setImageData] = useState();
  const {
    query: { slug },
  } = useRouter();

  async function loadPostData(slug) {
    const data = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/posts/?slug=${slug}`
    );
    setPostData(data.posts[0]);
  }

  async function loadImageData(id) {
    const data = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/media/?include=${id}`
    );
    setImageData(data.posts[0]?.source_url);
  }

  useEffect(() => {
    loadPostData(dangerousData(slug));
  }, []);

  useEffect(() => {
    post?.featured_media !== undefined && loadImageData(post.featured_media);
  }, [post]);

  return (
    <div id={styles.singlepostwrapper}>
      <div id={styles.singlepostnavbar}>
        <Link href="/">
          <button>Strona Główna</button>
        </Link>
      </div>
      {post ? (
        <div id={styles.singlepost}>
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          <p>{format(new Date(post?.date), "dd LLLL u - HH:mm")}</p>
          <img src={image || DEFAULT_IMAGE} alt="post"></img>
          <div
            id={styles.singlepostdata}
            dangerouslySetInnerHTML={{ __html: post?.content.rendered }}
          ></div>
        </div>
      ) : (
        <div>Loading Post</div>
      )}
    </div>
  );
}
