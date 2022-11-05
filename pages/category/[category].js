// Next.js imports
import { useRouter } from "next/router";

// Components imports
import PostsWrapper from "../files/components/PostsWrapper/PostsWrapper";

export default function () {
  const {
    query: { category },
  } = useRouter();

  return <PostsWrapper categoryName={category} />;
}
