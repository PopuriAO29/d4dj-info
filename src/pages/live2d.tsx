import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner, Text } from "evergreen-ui";
import { useEffect, useState } from "react";

const Live2DView = dynamic(() => import("@/components/Live2D"), {
  ssr: false,

  // eslint-disable-next-line react/display-name
  loading: () => <Loading />,
});

function Loading() {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 5000);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner />
      {show && (
        <Text color="muted" marginTop={5}>
          If loading continues, please close the page and try again
        </Text>
      )}
    </div>
  );
}

export default function Live2D() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>D4DJ.info Live2D</title>
        {/* eslint-disable-next-line @next/next/no-sync-scripts*/}
        <script src="/live2dcubismcore.min.js" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts*/}
        <script src="/live2d.min.js" />
      </Head>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Live2DView urlData={router.query.data} />
      </div>
    </>
  );
}
