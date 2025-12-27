"use client";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ isOpen, onClose }: CommentModalProps) {
  return (
    <>
    <div className={`fixed right-0 top-0 rounded-xl h-full w-80 bg-white shadow-xl z-[1500] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer font-bold text-xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* Placeholder for comments */}
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          {/* Add comment form here if needed */}
        </div>
      </div>
    </div>
    </>
   
  );
}