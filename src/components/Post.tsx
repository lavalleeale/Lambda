import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Post = ({
  post,
  hideFrom,
  showFull,
}: {
  post: PublicPostData;
  hideFrom?: boolean;
  showFull?: boolean;
}) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a>
        <div className="paper overflow-auto">
          <h3 className="text-2xl">{post.title}</h3>
          <p className={showFull ? undefined : "truncate"}>{post.body}</p>
          {!hideFrom && (
            <Link href={`/d/${post.sectionId}`}>
              <a className="text-gray-500">d/{post.sectionId}</a>
            </Link>
          )}
          <Link href={`/u/${post.author.name}`}>
            <a className="text-gray-500 float-right">u/{post.author.name}</a>
          </Link>
        </div>
      </a>
    </Link>
  );
};

export default Post;
