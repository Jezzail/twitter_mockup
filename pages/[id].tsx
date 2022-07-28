import React, { Fragment, useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  DocumentData,
} from "@firebase/firestore";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { getServerSideProps } from "../utils/serverProps";
import { db } from "../firebase";
import ModalContext from "../utils/modalContext";

import Head from "next/head";
import Modal from "../components/Modal";
import Post from "../components/Post";
import Comment from "../components/Comment";

const PostPage: NextPage = () => {
  const modalCtx = useContext(ModalContext);
  const [post, setPost] = useState<DocumentData>();
  const [comments, setComments] = useState<DocumentData[]>([]);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  return (
    <Fragment>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-twitter-white font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
          <div
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="h-5 text-white" />
          </div>
          Tweet
        </div>

        <Post id={id} post={post!} postPage />
        {comments.length > 0 && (
          <div className="pb-72">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment.data()}
              />
            ))}
          </div>
        )}
      </div>

      {modalCtx.modalOpen && <Modal />}
    </Fragment>
  );
};

export default PostPage;

export { getServerSideProps };
