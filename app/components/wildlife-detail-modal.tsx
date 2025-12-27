"use client";

import Image from "next/image";
import { useState } from "react";
import CommentModal from "./comment-modal";
import ToastNotification from "./toast-notification";

interface WildlifeDetailModalProps {
  selectedWildlife: any;
  closeModal: () => void;
  visible: boolean;
}

export default function WildlifeDetailModal({ selectedWildlife, closeModal, visible }: WildlifeDetailModalProps) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  if (!selectedWildlife) return null;

  return (
    <div className={`fixed left-0 top-0 z-[1000] transition-opacity duration-1000  ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col justify-start gap-13 bg-white p-6   max-w-md shadow-xl h-screen">
        <div className="pt-30"> 
            <h2 className="text-xl font-bold text-black mb-4">{selectedWildlife.title}</h2>
            <div className="mb-4">
              <Image
                src={selectedWildlife.image}
                alt={selectedWildlife.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
        </div>
        
        <div>
      <p className="text-gray-700 mb-2">{selectedWildlife.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={selectedWildlife.authorImage || "/wildlife-avatar.png"}
              alt="author avatar"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-600"><strong>Author:</strong> {selectedWildlife.author}</p>
        </div>
        <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {selectedWildlife.location}</p>
        <p className="text-sm text-gray-600 mb-4"><strong>Date:</strong> {selectedWildlife.date}</p>
        <div className="flex gap-2 mb-4">
          <button className="group flex-1 bg-white text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:cursor-pointer " onClick={() => setShowNotification(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:fill-red-500">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Like
          </button>
          <button className="group flex-1 bg-white text-black py-2 rounded-lg  flex items-center justify-center gap-2 hover:cursor-pointer " onClick={() => setShowCommentModal(!showCommentModal)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:fill-blue-500 transition-color duration-3000">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Comment
          </button>
        </div>
        <button
          onClick={() => { setShowCommentModal(false); closeModal(); }}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 hover:cursor-pointer "
        >
          Close
        </button>
        </div>
    
      </div>
      <CommentModal isOpen={showCommentModal} onClose={() => setShowCommentModal(false)} />
      <ToastNotification message="post liked" isVisible={showNotification} onClose={() => setShowNotification(false)} />
    </div>
  );
}