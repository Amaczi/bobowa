// React & style imports
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./singlepost.module.css";

// Next.js imports
import { useRouter } from "next/router";

// Other imports
import Navbar from "../../files/components/Navbar/Navbar";
import Loader from "../../files/components/Loader/Loader";
import { apiConnect } from "../../files/api/basic";
import { dangerousData } from "../../files/utils/basic";

// Defaults
const DEFAULT_IMAGE = "/placeholder169.png";

export default function Post() {
  const [post, setPostData] = useState();
  const [image, setImageData] = useState();
  const router = useRouter();
  const { slug } = router.query;

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
    if (slug !== undefined) {
      loadPostData(dangerousData(slug));
    }
  }, [slug]);

  useEffect(() => {
    post?.featured_media !== undefined && loadImageData(post.featured_media);
  }, [post]);

  return (
    <>
      <Navbar />
      <div id={styles.singlepostwrapper}>
        {post ? (
          <div id={styles.singlepost}>
            <h1
              id={styles.singlepost_title}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></h1>
            <p id={styles.singlepost_date}>
              {format(new Date(post?.date), "dd LLLL u - HH:mm")}
            </p>
            <img src={image || DEFAULT_IMAGE} alt="post"></img>
            <div
              id={styles.singlepostdata}
              dangerouslySetInnerHTML={{ __html: post?.content.rendered }}
            ></div>
          </div>
        ) : (
          <Loader loading="post" />
        )}
      </div>
    </>
  );
}
