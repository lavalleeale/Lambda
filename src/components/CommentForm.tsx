type CommentFormComponentProps = {
  commentId?: string;
  user: boolean | undefined;
  type: "post" | "comment";
  postId: string;
};

const CommentForm = ({
  commentId,
  user,
  type,
  postId,
}: CommentFormComponentProps) => {
  return (
    <form
      className="paper overflow-auto"
      action={user ? `/api/${type}s/${commentId || postId}/comment` : `/login`}
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
        <input disabled={!user} id="body" name="body" className="textfield" />
      </label>
      <button className="btn btn-blue float-right" type="submit">
        {user ? "Submit" : "Sign In To Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
