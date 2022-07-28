import React, { Fragment, useContext } from "react";
import type { NextPage } from "next";
import { getServerSideProps } from "../utils/serverProps";
import ModalContext from "../utils/modalContext";

import Head from "next/head";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <Fragment>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
      {modalCtx.modalOpen && <Modal />}
    </Fragment>
  );
};

export default Home;

export { getServerSideProps };
