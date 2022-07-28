import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { EmojiPicker } from "./EmojiPicker";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(""); //null
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) router.push("/");

  const sendPostHandler = async () => {
    if (loading) return;
    if (!session) return;
    setLoading(true);
    setShowEmojis(false);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(""); //null
  };

  const addImageToPostHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files![0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmojiHandler = (emoji: string) => {
    setInput((prevInput) => prevInput + emoji);
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${
        loading && "opacity-60"
      }`} //overflow-y-scroll
    >
      <img
        src={session?.user.image || "/generic.jpg"}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={` ${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What's happening?"
            className="bg-transparent outline-none text-twitter-white text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] " //overflow-hidden
          />
          {selectedFile && (
            <div className="relative">
              <div
                onClick={() => setSelectedFile("")}
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current!.click()}
              >
                <PhotographIcon className="h-[22px] text-twitter-blue" />
                <input
                  type="file"
                  id="file"
                  hidden
                  onChange={addImageToPostHandler}
                  ref={filePickerRef}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-twitter-blue" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-twitter-blue h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-twitter-blue h-[22px]" />
              </div>

              {showEmojis && (
                <EmojiPicker addEmoji={addEmojiHandler} theme="dark" />
              )}
            </div>
            <button
              className="bg-twitter-blue text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-twitter-navy disabled:hover:bg-twitter-blue disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPostHandler}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
