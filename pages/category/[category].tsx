// Next.js & Typescript imports
import { NextRouter, useRouter } from "next/router";

// Components & Other imports
import PostsWrapper from "../../files/components/PostsWrapper/PostsWrapper";
import Navbar from "../../files/components/Navbar/Navbar";

export default function (): JSX.Element {
  const router: NextRouter = useRouter();
  const category: string | string[] = router.query.category;

  return (
    <>
      <Navbar />
      <PostsWrapper categoryName={category} />
    </>
  );
}
