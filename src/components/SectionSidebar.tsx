const SectionSidebar = ({ name }: { name: string }) => {
  return (
    <div className="paper overflow-auto w-1/4" id="sidebar">
      <form action={`/d/${name}/submit`} method="POST">
        <button className="btn-pill btn-white w-full">Create Post</button>
      </form>
    </div>
  );
};

export default SectionSidebar;
