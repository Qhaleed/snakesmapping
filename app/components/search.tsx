import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Search() {
  return (
    <div className="flex items-center bg-white w-150 justify-between rounded-4xl py-2 px-2  shadow-md">
      <div>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="px-4 text-gray-500 hover:cursor-pointer"
        />
        <input
          className="placeholder:text-gray-400 text-gray-900 w-105 px-4 focus:outline-none"
          placeholder="Search species, locations, or author"
        />
      </div>
      <Link href="/wildlife-map">
         <button className="bg-green-600 text-white font-semibold rounded-3xl py-2 px-6 hover:bg-green-700 hover:cursor-pointer transition-colors">
        Search
      </button>
      </Link>
   
    </div>
  );
}
