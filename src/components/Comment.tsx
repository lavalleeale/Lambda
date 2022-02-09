/* eslint-disable @next/next/no-img-element */
import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

type commentType = {
  id: string;
  body: string;
  author: {
    name: string;
  };
  upsNum: number;
  downsNum: number;
  ups: {}[];
  downs: {}[];
};

const Comment = ({ comment }: { comment: commentType }) => {
  return (
    <Link href={`/posts/${comment.id}`}>
      <a>
        <div className="paper overflow-auto">
          <div className="w-full ">
            <Link href={`/u/${comment.author.name}`}>
              <a className="text-gray-500">u/{comment.author.name}</a>
            </Link>
          </div>
          <div className="w-full flex flex-col justify-between">
            <p>{comment.body}</p>
            <div className="dark:bg-slate-800 bg-slate-400/80 rounded-md p-2 text-center flex w-24 justify-between">
              <Link href={`/api/posts/${comment.id}/updoot`}>
                <a
                  className={`block ${
                    comment.ups.length !== 0 ? "orange" : ""
                  }`}
                >
                  <img src="/updoot.png" alt="updoot" className="w-6" />
                </a>
              </Link>
              <p className="text-gray-500">
                {comment.upsNum - comment.downsNum}
              </p>
              <Link href={`/api/posts/${comment.id}/downdoot`}>
                <a className={`${comment.downs.length !== 0 ? "pruple" : ""}`}>
                  <img src="/downdoot.png" alt="downdoot" className="w-6" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Comment;
