import React, { FC, useRef, useEffect } from "react";
import { Platform, Text, View, WebView, Button } from "react-native";

const isAndroid = Platform.OS === "android";

const playlist = [
  "https://www.youtube.com/watch?v=P05yNJ6PvEw",
  "https://www.youtube.com/watch?v=WA7_9KVedcs"
];

const App: FC = () => {
  const ref = useRef<any>(undefined);

  useEffect(() => {
    if (ref.current) {
      let index = 0;
      setTimeout(() => {
        ref.current.postMessage(
          JSON.stringify({
            prefix: "webview",
            type: "play",
            payload: playlist[index++]
          }),
          "*"
        );
      }, 4000);
    }
  }, [ref]);

  return (
    <View style={{ flex: 1 }}>
      <Text>hello</Text>
      <WebView
        ref={ref}
        source={{
          uri: isAndroid
            ? "file:///android_asset/webview/youtube/index.html"
            : "./external/widget/index.html"
        }}
        domStorageEnabled
        javaScriptEnabled
        allowsInlineMediaPlayback
        startInLoadingState
        mediaPlaybackRequiresUserAction={false}
        style={{ flex: 1 }}
      />
      <Button
        onPress={() => {
          ref.current.postMessage(
            JSON.stringify({
              prefix: "webview",
              type: "play",
              payload: playlist[0]
            }),
            "*"
          );
        }}
        title="play"
      />
      <Button
        onPress={() => {
          ref.current.postMessage(
            JSON.stringify({
              prefix: "webview",
              type: "switch"
            }),
            "*"
          );
        }}
        title="switch"
      />
    </View>
  );
};

export default App;
