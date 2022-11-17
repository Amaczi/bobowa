// React & Styles imports
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./post.module.css";

// Next.js & Typescript imports
import Link from "next/link";

// Components & Other imports
import { apiConnect } from "../../api/basic";

// Defaults
const DEFAULT_IMAGE = "/placeholder43.png";

// Interfaces
interface DataProps {
  data: {
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
    id: number;
    slug: string;
    date: string;
    featured_media: number;
    categories: [];
  };
}

interface ImageProps {
  posts: {
    source_url?: string;
  };
}

interface CategoryProps {
  posts: {};
}

export default function Post({ data }: DataProps): JSX.Element {
  const [image, setImageData] = useState<any | null>();
  const [categories, setCategoriesData] = useState<any | null>();

  async function loadImage(id: number): Promise<void> {
    const data: ImageProps = await apiConnect(
      `https://bobowa24.pl/wp-json/wp/v2/media/${id}`
    );
    setImageData(data.posts.source_url);
  }

  async function loadCategory(ids: []): Promise<void> {
    const data: CategoryProps = await apiConnect(
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
        <Link
          href="/post/[slug]"
          as={`/post/${data.slug}`}
          className={styles.post_link_image}
        >
          <img
            src={image || DEFAULT_IMAGE}
            className={styles.post_image}
            alt="post"
          ></img>
        </Link>
        <div className={styles.post_categories}>
          {categories?.posts.map((el) => {
            return (
              <Link
                className={styles.post_category}
                key={`${data.id}${el.id}`}
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
        <Link
          href="/post/[slug]"
          as={`/post/${data.slug}`}
          className={styles.post_link}
        >
          <h3
            className={styles.post_title}
            dangerouslySetInnerHTML={{ __html: data.title.rendered }}
          ></h3>
        </Link>
        <div
          className={styles.post_description}
          dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}
        ></div>
      </div>
      <div className={styles.post_readmore}>
        <Link href="/post/[slug]" as={`/post/${data.slug}`}>
          Czytaj dalej
        </Link>
      </div>
    </div>
  );
}
