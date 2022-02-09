/* eslint-disable @next/next/no-img-element */
import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import CommentForm from "./CommentForm";
import Modal from "./Modal";

export type commentType = {
  id: string;
  body: string;
  postId: string;
  author: {
    name: string;
  };
  upsNum: number;
  downsNum: number;
  ups: {}[];
  downs: {}[];
  children?: commentType[];
};

const Comment = ({
  comment,
  user,
}: {
  comment: commentType;
  user?: boolean;
}) => {
  return (
    <>
      <div className="paper overflow-auto">
        <div className="float-right">
          <Modal text="Add Comment">
            <CommentForm
              commentId={comment.id}
              user={user}
              type="comment"
              postId={comment.postId}
            />
          </Modal>
        </div>
        <div className="w-full ">
          <Link href={`/u/${comment.author.name}`}>
            <a className="text-gray-500">u/{comment.author.name}</a>
          </Link>
        </div>
        <div className="w-full flex flex-col justify-between">
          <p>{comment.body}</p>
          <div className="rounded-md text-center flex w-16 justify-between">
            <Link href={`/api/posts/${comment.id}/updoot`}>
              <a
                className={`block ${
                  comment.ups.length !== 0
                    ? "orange"
                    : "dark:filter dark:invert"
                }`}
              >
                <img src="/updoot.png" alt="updoot" className="w-6" />
              </a>
            </Link>
            <p className="text-gray-500">{comment.upsNum - comment.downsNum}</p>
            <Link href={`/api/posts/${comment.id}/downdoot`}>
              <a
                className={`${
                  comment.downs.length !== 0
                    ? "pruple"
                    : "dark:filter dark:invert"
                }`}
              >
                <img src="/downdoot.png" alt="downdoot" className="w-6" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {comment.children && (
        <div className="pl-10">
          {comment.children.map((child) => (
            <Comment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
