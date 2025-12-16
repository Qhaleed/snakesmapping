import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white py-4 ">
      <div className="flex items-center justify-between px-8">
        <div className="flex-1"></div>

        <ul className="flex flex-1 items-center justify-center gap-6 text-sm text-black">
          <li className="hover:underline cursor-pointer">About us</li>
          <li className="hover:underline cursor-pointer">Data policy</li>
          <li className="hover:underline cursor-pointer">Help Center</li>
        </ul>

        <ul className="flex flex-1 items-center justify-end gap-4 text-lg text-black">
          <li className="hover:scale-110 cursor-pointer transition-transform">
            <FontAwesomeIcon icon={faXTwitter} />
          </li>
          <li className="hover:scale-110 cursor-pointer transition-transform">
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li className="hover:scale-110 cursor-pointer transition-transform">
            <FontAwesomeIcon icon={faYoutube} />
          </li>
          <li className="hover:scale-110 cursor-pointer transition-transform">
            <FontAwesomeIcon icon={faLinkedin} />
          </li>
        </ul>
      </div>
    </footer>
  );
}
