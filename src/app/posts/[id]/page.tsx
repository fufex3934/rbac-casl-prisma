import PostClientPage from "@/components/PostClientPage";


const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,{
  //   cache:"no-store"
  // });
  // if(!res.ok){
  // if(res.status === 404) notFound();
  // throw new Error("Access denied or error loading post.");
  // }
  // const post = await res.json();

  return <PostClientPage id={id} />;
};

export default PostPage;
