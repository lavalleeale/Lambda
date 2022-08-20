import PageSelector from "./PageSelector";
import Post from "./Post";
import SortSelector from "./SortSelector";

type PostsComponentProps = {
  posts: (PublicPostData & {
    section: {
      moderators: {}[];
    };
  })[];
  sort: string;
  page: number;
  name: string;
  path: string;
  currentUser: string | null;
};

const Posts = ({
  posts,
  sort,
  page,
  name,
  path,
  currentUser,
}: PostsComponentProps) => {
  return (
    <div className="w-3/4 inline-block">
      <div className="paper">
        <p className="text-3xl capitalize">{name} </p>
      </div>
      <SortSelector sort={sort} page={page} path={path} />
      {posts.length !== 0 ? (
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              hideFrom={path !== "/home"}
              showFull={false}
              currentUser={currentUser}
            />
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

export default Posts;
