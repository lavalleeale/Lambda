import { Post } from "@prisma/client";
import Link from "next/link";
import { CSSProperties } from "react";
import CommentForm from "./CommentForm";
import Menu from "./Menu";
import VoteDisplay from "./VoteDisplay";

type PostComponentProps = {
  post: PublicPostData & { section: { moderators: {}[] } };
  currentUser: string | null;
  hideFrom?: boolean;
  showFull?: boolean;
};

const Post = ({
  post,
  hideFrom,
  showFull,
  currentUser,
}: PostComponentProps) => {
  return (
    <>
      <div className="overflow-auto paper flex">
        <VoteDisplay
          votes={post.upsNum - post.downsNum}
          id={post.id}
          up={post.ups.length !== 0}
          down={post.downs.length !== 0}
        />
        <div className="flex flex-col w-full sm:post-body">
          <div className="flex grow flex-row">
            <ConditionalLink
              to={`/posts/${post.id}`}
              condition={!showFull}
              className="grow w-0"
            >
              <div>
                <h3 className="text-2xl">{post.title}</h3>
                <p className={showFull ? "break-all" : "break-all truncate"}>
                  {post.body}
                </p>
              </div>
            </ConditionalLink>
            <Menu
              id={`post-${post.id}`}
              options={[
                {
                  name: "Delete",
                  image: "/delete.png",
                  action: `/api/posts/${post.id}/delete`,
                  enabled:
                    currentUser === post.author.name ||
                    post.section.moderators.length !== 0,
                },
                {
                  name: "Crosspost",
                  image: "/cross.png",
                  action: `/posts/${post.id}/cross`,
                  enabled: currentUser !== null,
                },
              ]}
            />
          </div>
          <div className="w-full justify-end">
            {!hideFrom && (
              <Link href={`/d/${post.sectionId}`}>
                <a className="text-gray-500">d/{post.sectionId}</a>
              </Link>
            )}
            <Link href={`/u/${post.author.name}`}>
              <a className="text-gray-500 float-right">u/{post.author.name}</a>
            </Link>
          </div>
        </div>
      </div>
      {showFull && (
        <CommentForm postId={post.id} user={currentUser !== null} type="post" />
      )}
    </>
  );
};

const ConditionalLink = ({
  children,
  to,
  condition,
  className,
  style,
}: {
  children: JSX.Element;
  to: string;
  condition?: boolean;
  className?: string;
  style?: CSSProperties;
}) =>
  condition ? (
    <Link href={to}>
      <a className={className} style={style}>
        {children}
      </a>
    </Link>
  ) : (
    <div className={className} style={style}>
      {children}
    </div>
  );

export default Post;
