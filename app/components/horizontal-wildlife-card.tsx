import Image from "next/image";

type cardData = {
  imageLink: string;
  title: string;
  author: string;
  description: string;
  location: string;
  calendar: string;
  authorImage?: string;
};

export default function HorizontalWildlifeCard({
  imageLink,
  title,
  author,
  description,
  location,
  calendar,
  authorImage = "/wildlife-avatar.png",
}: cardData) {
  return (
    <div className="flex w-full h-48 shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Wildlife image */}
      <div className="relative w-48 h-full shrink-0">
        <Image
          src={imageLink}
          alt="wildlifeImage"
          fill
          sizes="192px"
          className="object-cover"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col flex-1 p-4 gap-2 min-w-0">
        <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>

        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-5 h-5 shrink-0 rounded-full overflow-hidden">
            <Image
              src={authorImage}
              alt="author avatar"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          <h2 className="text-xs text-gray-600 truncate">{author}</h2>
        </div>

        <p className="text-xs text-gray-700 flex-1 line-clamp-3 overflow-hidden">
          <span className="font-semibold">Description: </span>
          {description}
        </p>

        <div className="flex justify-around items-center pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500 italic">{location}</span>
          <span className="text-xs text-gray-500 italic">{calendar}</span>
        </div>
      </div>
    </div>
  );
}
