// React & style imports
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import styles from "./post.module.css";

// Next.js imports
import Link from "next/link";

// Other imports
import { apiConnect } from "../../api/basic";

// Defaults
const DEFAULT_IMAGE = "/placeholder43.png";

export default function Post({ data }) {
  const [image, setImageData] = useState();
  const [categories, setCategoriesData] = useState();

  async function loadImage(id) {
    const data = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/media/${id}`
    );
    setImageData(data.posts.source_url);
  }

  async function loadCategory(ids) {
    const data = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/categories/?include=${ids.toString()}`
    );
    setCategoriesData(data);
  }

  useEffect(() => {
    data.featured_media !== 0 && loadImage(data.featured_media);
    data.categories !== undefined && loadCategory(data.categories);
  }, [data]);

  return (
    <div className={styles.post}>
      <div>
        <img
          src={image || DEFAULT_IMAGE}
          className={styles.post_image}
          alt="post"
        ></img>
        <div className={styles.post_categories}>
          {categories?.posts.map((el) => {
            return (
              <Link
                className={styles.post_category}
                key={uuidv4()}
                href={`/category/${el.slug}/`}
              >
                {el.name}
              </Link>
            );
          })}
        </div>
        <p className={styles.post_date}>
          {format(new Date(data.date), "d LLL u - HH:mm")}
        </p>
        <h3
          className={styles.post_title}
          dangerouslySetInnerHTML={{ __html: data.title.rendered }}
        ></h3>
        <div
          className={styles.post_description}
          dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}
        ></div>
      </div>
      <div className={styles.post_readmore}>
        <button>
          <Link href="/post/[slug]" as={`/post/${data.slug}`}>
            Czytaj dalej
          </Link>
        </button>
      </div>
    </div>
  );
}
