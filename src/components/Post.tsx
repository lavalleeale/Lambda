import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import CommentForm from "./CommentForm";
import Modal from "./Modal";
import SectionLink from "./SectionLink";
import UserLink from "./UserLink";
import VoteDisplay from "./VoteDisplay";

const Post = ({
  post,
  hideFrom,
  showFull,
  user,
}: {
  post: PublicPostData;
  hideFrom?: boolean;
  showFull?: boolean;
  user?: boolean;
}) => {
  return (
    <div className="overflow-auto paper flex">
      <VoteDisplay
        votes={post.upsNum - post.downsNum}
        id={post.id}
        up={post.ups.length !== 0}
        down={post.downs.length !== 0}
      />
      <div className="flex flex-col justify-between w-full sm:post-body">
        <ConditionalLink
          to={`/posts/${post.id}`}
          condition={!showFull}
          className="grow"
        >
          <div>
            {showFull && (
              <div className="float-right">
                <Modal text="Add Comment">
                  <CommentForm postId={post.id} user={user} type="post" />
                </Modal>
              </div>
            )}
            <h3 className="text-2xl">{post.title}</h3>
            <p className={showFull ? "break-all" : "break-all truncate"}>
              {post.body}
            </p>
          </div>
        </ConditionalLink>
        <div className="w-full">
          {!hideFrom && <SectionLink section={post.sectionId} />}
          <UserLink user={post.author.name} />
        </div>
      </div>
    </div>
  );
};

const ConditionalLink = ({
  children,
  to,
  condition,
  className,
}: {
  children: JSX.Element;
  to: string;
  condition?: boolean;
  className?: string;
}) =>
  condition ? (
    <Link href={to}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    children
  );

export default Post;
