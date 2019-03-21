import React, { FunctionComponent, useState } from "react";
import ReactPlayer from "react-player";
import { useEffect } from "react";

const App: FunctionComponent = () => {
  const [url, setUrl] = useState(undefined as any);
  const [play, setPlay] = useState(false);
  const [debug, setDebug] = useState("debug");
  const [progress, setProgress] = useState(0 as number);

  useEffect(() => {
    setTimeout(() => {
      if (window) {
        window.addEventListener("message", handleMessage);
        document.addEventListener("message", handleMessage);
        setDebug("window");
      } else {
        setDebug("unable to add event listener");
      }
    }, 1000);
  }, []);

  const handleMessage: EventListener = event => {
    setPlay(false);
    setDebug(JSON.stringify(event));
    const data = (event as any).data as string;
    setDebug(data);
    try {
      const msgData: {
        prefix: string;
        type: string;
        payload: string;
      } = JSON.parse(data);
      if (msgData.prefix === "webview") {
        console.log({ msgData });
        switch (msgData.type) {
          case "play":
            console.log("play", msgData.payload);
            setUrl(undefined);
            setUrl(msgData.payload);
            setPlay(true);
            break;
          case "switch":
            setPlay(prev => !prev);
            break;
          default:
        }
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div>
      <p>youtube</p>
      <p>{debug}</p>
      <p>{url}</p>
      <p>{progress}</p>
      {url && (
        <ReactPlayer
          url={url}
          playing={play}
          controls
          height={300}
          width={300}
          onReady={() =>
            setTimeout(() => {
              setPlay(true);
            }, 1000)
          }
          onProgress={e => setProgress(e.playedSeconds)}
        />
      )}
    </div>
  );
};

export default App;
