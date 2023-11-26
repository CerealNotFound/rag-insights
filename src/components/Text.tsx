import Image from "next/image";

type TextProp = {
  //   profilePic: string;
  text: string;
  type: string;
};

const Text = ({ text, type }: TextProp) => {
  const checkType = () => {
    if (type == "sender") {
      return {
        flexPosition: "justify-end",
        textBg: "bg-teal-400",
      };
    }
    return {
      flexPosition: "justify-start",
      textBg: "bg-neutral-800",
    };
  };

  return (
    <div
      className={`flex flex-row mb-4 items-center ${checkType().flexPosition}`}
    >
      {/* <Image
        src={profilePic}
        unoptimized={true}
        width="40"
        height="40"
        alt="user profile picture"
        className="rounded-full"
      /> */}
      <div className={`text-white ml-4 p-2 rounded-2xl  ${checkType().textBg}`}>
        {text}
      </div>
    </div>
  );
};

export default Text;

{
  /* <div className="flex flex-row items-center mb-4">
  <Image
    src={"/test-pfp.jpg"}
    unoptimized={true}
    width="40"
    height="40"
    alt="anime girl pfp"
    className="rounded-full"
  />
  <div className="text-white ml-4">Hi! How arrrr you doin today!? 😇</div>
</div>; */
}
