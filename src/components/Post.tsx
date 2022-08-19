import { Post } from "@prisma/client";
import Link from "next/link";
import CommentForm from "./CommentForm";
import Menu from "./Menu";
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
    <>
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
              <Menu
                id={`post-${post.id}`}
                options={[
                  {
                    name: "Delete",
                    image: "/delete.png",
                    action: `/api/posts/${post.id}/delete`,
                  },
                  {
                    name: "Crosspost",
                    image: "/cross.png",
                    action: `/posts/${post.id}/cross`,
                  },
                ]}
              />
              <h3 className="text-2xl">{post.title}</h3>
              <p className={showFull ? "break-all" : "break-all truncate"}>
                {post.body}
              </p>
            </div>
          </ConditionalLink>
          <div className="w-full">
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
      {showFull && <CommentForm postId={post.id} user={user} type="post" />}
    </>
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
