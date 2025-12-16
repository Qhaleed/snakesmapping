import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  return (
    <div className="flex bg-white w-fit text-gray-400 rounded-2xl">
      <input
        className=" placeholder:text-gray-400 w-150 px-10 focus:outline-none"
        placeholder="Search species, locations, or author"
      ></input>
      <div>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="px-10 hover:cursor-pointer py-2 rounded-2xl mt-1 mr-1 bg-green-400 text-white"
        />
      </div>
    </div>
  );
}
