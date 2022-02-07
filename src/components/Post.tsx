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
        <div className="paper overflow-auto flex">
          <div className="bg-slate-800 mr-2 px-2">
            <Link href={`/api/posts/${post.id}/updoot`}>
              <a
                className={`block ${
                  post.ups.length !== 0 ? "text-orange-500" : ""
                }`}
              >
                <i className="bi-arrow-up-square text-xl" />
              </a>
            </Link>
            <Link href={`/api/posts/${post.id}/downdoot`}>
              <a
                className={`${
                  post.downs.length !== 0 ? "text-purple-500" : ""
                }`}
              >
                <i className="bi-arrow-down-square text-xl" />
              </a>
            </Link>
          </div>
          <div className="w-full">
            <h3 className="text-2xl">{post.title}</h3>
            <p className={showFull ? undefined : "truncate"}>{post.body}</p>
            {!hideFrom && (
              <Link href={`/d/${post.sectionId}`}>
                <a className="text-gray-500">Section: d/{post.sectionId}</a>
              </Link>
            )}
            <p className="text-gray-500 inline ml-1">
              Score: {post.upsNum - post.downsNum}
            </p>
            <Link href={`/u/${post.author.name}`}>
              <a className="text-gray-500 float-right">u/{post.author.name}</a>
            </Link>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
