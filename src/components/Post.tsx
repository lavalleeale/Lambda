import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Post = ({ post }: { post: PublicPostData }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a>
        <div className="paper">
          <h3 className="text-2xl">{post.title}</h3>
          <p className="truncate">{post.body}</p>
        </div>
      </a>
    </Link>
  );
};

export default Post;
