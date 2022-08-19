/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CommentForm from "./CommentForm";
import Modal from "./Modal";

export type commentType = {
  depth: number;
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

type CommentComponentProps = {
  comment: commentType;
  user?: boolean;
};

const Comment = ({ comment, user }: CommentComponentProps) => {
  return (
    <>
      <div className="paper overflow-auto">
        {comment.depth < 5 && (
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
        )}
        <div className="w-full ">
          <Link href={`/u/${comment.author.name}`}>
            <a className="text-gray-500">u/{comment.author.name}</a>
          </Link>
        </div>
        <div className="w-full flex flex-col justify-between">
          <p>{comment.body}</p>
          <div className="rounded-md text-center flex w-16 justify-between">
            <Link href={`/api/comments/${comment.id}/updoot`}>
              <a
                className={`block ${
                  comment.ups.length !== 0
                    ? "orange"
                    : "dark:filter dark:invert"
                }`}
              >
                <img src="/vote.png" alt="updoot" className="w-6" />
              </a>
            </Link>
            <p className="text-gray-500">{comment.upsNum - comment.downsNum}</p>
            <Link href={`/api/comments/${comment.id}/downdoot`}>
              <a
                className={`${
                  comment.downs.length !== 0
                    ? "purple rotate-180"
                    : "dark:filter dark:invert rotate-180"
                }`}
              >
                <img src="/vote.png" alt="downdoot" className="w-6" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {comment.children && (
        <div className="pl-10">
          {comment.children.map((child) => (
            <Comment key={child.id} comment={child} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
