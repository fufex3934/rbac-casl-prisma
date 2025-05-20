"use client";
import { useEffect, useState } from "react";
import { Post } from "@/generated/prisma";
const PostClientPage = ({ id }: { id: string }) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return <p>Loading...</p>;
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
    </div>
  );
};

export default PostClientPage;
