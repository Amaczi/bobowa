// Next.js imports
import { useRouter } from "next/router";

// Components imports
import PostsWrapper from "../../files/components/PostsWrapper/PostsWrapper";
import Navbar from "../../files/components/Navbar/Navbar";

export default function () {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <Navbar />
      <PostsWrapper categoryName={category} />
    </>
  );
}
