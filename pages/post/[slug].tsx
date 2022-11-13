// React & Styles imports
import React, { useEffect, useState } from "react";
import styles from "./singlepost.module.css";
import { format } from "date-fns";

// Next.js & Typescript imports
import { useRouter } from "next/router";

// Components & Other imports
import Navbar from "../../files/components/Navbar/Navbar";
import Loader from "../../files/components/Loader/Loader";
import { apiConnect } from "../../files/api/basic";
import { dangerousData } from "../../files/utils/basic";

// Defaults
const DEFAULT_IMAGE = "/placeholder169.png";

// Interfaces
interface PostProps {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
}

interface ImageProps {
  source_url: string;
}

export default function (): JSX.Element {
  const [post, setPostData] = useState<PostProps>();
  const [image, setImageData] = useState<ImageProps>();
  const router = useRouter();
  const slug: string | string[] = router.query.slug;

  async function loadPostData(slug: string) {
    const data: { posts: object; maxPages: number } = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/posts/?slug=${slug}`
    );
    setPostData(data.posts[0]);
  }

  async function loadImageData(id: number) {
    const data: { posts: object; maxPages: number } = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/media/?include=${id}`
    );
    setImageData(data.posts[0]);
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
              dangerouslySetInnerHTML={{ __html: post?.title.rendered }}
            ></h1>
            <p id={styles.singlepost_date}>
              {format(new Date(post?.date), "dd LLLL u - HH:mm")}
            </p>
            <img src={image?.source_url || DEFAULT_IMAGE} alt="post"></img>
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
