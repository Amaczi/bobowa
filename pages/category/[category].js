// Next.js imports
import { useRouter } from "next/router";

// Components imports
import PostsWrapper from "../../files/components/PostsWrapper/PostsWrapper";
import Navbar from "../../files/components/Navbar/Navbar";

export default function () {
  const {
    query: { category },
  } = useRouter();

  return (
    <>
      <Navbar />
      <PostsWrapper categoryName={category} />
    </>
  );
}
