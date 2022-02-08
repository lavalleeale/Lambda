/* eslint-disable @next/next/no-img-element */
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
          <div className="dark:bg-slate-800 bg-slate-400/80 rounded-md mr-2 self-stretch p-2 text-center">
            <Link href={`/api/posts/${post.id}/updoot`}>
              <a className={`block ${post.ups.length !== 0 ? "orange" : ""}`}>
                <img src="/updoot.png" alt="updoot" className="w-6" />
              </a>
            </Link>
            <p className="text-gray-500">{post.upsNum - post.downsNum}</p>
            <Link href={`/api/posts/${post.id}/downdoot`}>
              <a className={`${post.downs.length !== 0 ? "pruple" : ""}`}>
                <img src="/downdoot.png" alt="downdoot" className="w-6" />
              </a>
            </Link>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="">
              <h3 className="text-2xl">{post.title}</h3>
              <p className={showFull ? undefined : "truncate"}>{post.body}</p>
            </div>
            <div className="w-full ">
              {!hideFrom && (
                <Link href={`/d/${post.sectionId}`}>
                  <a className="text-gray-500">Section: d/{post.sectionId}</a>
                </Link>
              )}
              <Link href={`/u/${post.author.name}`}>
                <a className="text-gray-500 float-right">
                  u/{post.author.name}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
