import React from "react";

const CommentForm = ({
  commentId,
  user,
  type,
  postId,
}: {
  commentId?: string;
  user: boolean | undefined;
  type: "post" | "comment";
  postId: string;
}) => {
  return (
    <form
      className="paper overflow-auto"
      action={user ? `/api/${type}s/${commentId || postId}/comment` : "/login"}
      method="POST"
    >
      <input type="hidden" id="postId" name="postId" value={postId}></input>
      <input
        type="hidden"
        id="commentId"
        name="commentId"
        value={commentId}
      ></input>
      <label>
        Comment
        <input
          disabled={!user}
          id="body"
          name="body"
          className="dark:disabled:bg-slate-800 dark:bg-slate-500 disabled:bg-slate-400 w-full p-1 mb-1 rounded-md"
        />
      </label>
      <button className="btn btn-blue float-right" type="submit">
        {user ? "Submit" : "Sign In To Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
