import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
const Post = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    include:{author:true},
    orderBy:{title:'asc'}
  });
 

  if (!posts || posts.length === 0) {
    return <p>Post not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All posts</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border p-4 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="text-xl">{post.title}</h2>
              <p className="text-gray-600 text-sm">By {post.author.email}</p>
              <p className="mt-5">{post.content}</p>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
