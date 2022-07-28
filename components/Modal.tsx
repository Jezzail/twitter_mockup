import React, { Fragment, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  DocumentData,
} from "@firebase/firestore";
import { db } from "../firebase";
import ModalContext from "../utils/modalContext";

import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { EmojiPicker } from "./EmojiPicker";

const Modal = () => {
  const { data: session } = useSession();
  const modalCtx = useContext(ModalContext);
  const [post, setPost] = useState<DocumentData>();
  const [comment, setComment] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", modalCtx.postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db, modalCtx.postId]
  );

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session) {
      e.preventDefault();

      setShowEmojis(false);

      await addDoc(collection(db, "posts", modalCtx.postId, "comments"), {
        comment: comment,
        username: session.user.name,
        tag: session.user.tag,
        userImg: session.user.image,
        timestamp: serverTimestamp(),
      });

      setComment("");
      modalCtx.setModal(false);

      router.push(`/${modalCtx.postId}`);
    }
  };

  const addEmojiHandler = (emoji: string) => {
    setComment((prevComment) => prevComment + emoji);
  };

  return (
    <Transition.Root show={modalCtx.modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 pt-8"
        onClose={modalCtx.setModal}
      >
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => modalCtx.setModal(false)}
                >
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <img
                      src={post?.userImg}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-twitter-white inline-block text-[15px] sm:text-base">
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}{" "}
                        </span>
                      </div>
                      {" · "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="text-twitter-white text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      src={session?.user.image || "/generic.jpg"}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows={2}
                        className="bg-transparent outline-none text-twitter-white text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />

                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotographIcon className="text-twitter-blue h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <ChartBarIcon className="text-twitter-blue h-[22px]" />
                          </div>

                          <div className="icon">
                            <EmojiHappyIcon
                              className="text-twitter-blue h-[22px]"
                              onClick={() => setShowEmojis(!showEmojis)}
                            />
                          </div>

                          <div className="icon">
                            <CalendarIcon className="text-twitter-blue h-[22px]" />
                          </div>

                          {showEmojis && (
                            <EmojiPicker
                              addEmoji={addEmojiHandler}
                              theme="dark"
                            />
                          )}
                        </div>
                        <button
                          className="bg-twitter-blue text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-twitter-navy disabled:hover:bg-twitter-blue disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
