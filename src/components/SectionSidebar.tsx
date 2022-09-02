import Link from "next/link";
import IconButton from "./IconButton";
import Modal from "./Modal";

type SectionSidebarComponentProps = {
  name: string;
  mods: {
    name: string;
  }[];
  modIds: {}[];
};

const SectionSidebar = ({
  name,
  mods,
  modIds,
}: SectionSidebarComponentProps) => {
  return (
    <div className="paper overflow-auto w-1/4 relative" id="sidebar">
      <p className="text-3xl text-center">d/{name}</p>
      <form action={`/d/${name}/submit`} method="POST">
        <button className="btn-pill btn-white w-full">Create Post</button>
      </form>
      <p>Moderators:</p>
      {mods.map((mod) => (
        <div key={mod.name}>
          <Link href={`/u/${mod.name}`}>
            <a className="text-gray-500">u/{mod.name}</a>
          </Link>
        </div>
      ))}
      {modIds.length !== 0 && (
        <>
          <Modal text={"Add"} id="Add Mod">
            <form
              className="paper overflow-auto"
              action={`/api/d/${name}/addMod`}
              method="POST"
            >
              <h3 className="text-3xl text-center">Add Mod</h3>
              <input
                placeholder="Name"
                className="textfield"
                id="name"
                name="name"
              />
              <button className="btn btn-blue float-right" type="submit">
                Add
              </button>
            </form>
          </Modal>
          <IconButton
            link={`/api/d/${name}/delete`}
            image="/delete.png"
            name="Delete"
            className="absolute right-0 bottom-0"
          />
        </>
      )}
    </div>
  );
};

export default SectionSidebar;
