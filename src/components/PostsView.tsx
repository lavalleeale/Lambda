import PageSelector from "./PageSelector";
import SortSelector from "./SortSelector";
import Post from "./Post";

const PostsView = ({
  posts,
  sort,
  page,
  name,
  path,
}: {
  posts: (PublicPostData & { author: { name: string } })[];
  sort: string;
  page: number;
  name: string;
  path: string;
}) => {
  return (
    <div className="w-3/4 inline-block">
      <div className="paper">
        <p className="text-3xl capitalize">{name} </p>
      </div>
      <SortSelector sort={sort} page={page} path={path} />
      {posts.length !== 0 ? (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} hideFrom={path !== "/home"} />
          ))}
          <PageSelector page={page} postsCount={posts.length} />
        </div>
      ) : (
        <div className="paper">
          <p>No Posts Found :(</p>
        </div>
      )}
    </div>
  );
};

export default PostsView;
