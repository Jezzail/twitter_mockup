import { useEffect, useRef } from "react";
import { EmojiData } from "emoji-mart";
import data from "@emoji-mart/data";

export const EmojiPicker = (props: any) => {
  const ref = useRef<any>();
  const showEmojis = useRef(true);

  const emojiHandler = (e: EmojiData) => {
    // @ts-ignore
    const sym = e.unified.split("-");
    const codesArray: string[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    // @ts-ignore
    const emoji = String.fromCodePoint(...codesArray);

    props.addEmoji(emoji);
  };

  useEffect(() => {
    if (showEmojis.current) {
      showEmojis.current = false;
      import("emoji-mart").then((EmojiMart) => {
        new EmojiMart.Picker({
          ...props,
          data,
          ref,
          onEmojiSelect: emojiHandler,
        });
      });
    }
  }, [props]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        marginTop: "465px",
        marginLeft: -40,
        maxWidth: "320px",
        borderRadius: "20px",
      }}
    ></div>
  );
};
