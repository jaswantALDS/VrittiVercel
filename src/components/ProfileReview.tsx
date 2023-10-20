import { FC } from "react";
import { FaFeather } from "react-icons/fa";

const ProfileReview: FC = () => {
  const handleExploreClick = () => {
    console.log("ready to dashboard");
    // router.push("/dashboard"); // Replace '/dashboard' with the appropriate route for your app.
  };

  return (
    <div className="pt-20 bg-secondary h-screen flex flex-col items-center justify-center">
      <div className="h-24"></div>
      <div className="w-44 h-44 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-transparent">
        <FaFeather name="check" size={102} color="gold" />
      </div>
      <div className="items-center my-5">
        <p className="text-white mx-4 text-center my-4 opacity-50 text-lg">
          Your profile has been successfully set up, and it is now being
          reviewed. While you wait, please explore the app's diverse features.
        </p>
      </div>
      <button
        className="mx-3 p-4 bg-transparent text-white text-lg"
        onClick={handleExploreClick}
      >
        Let's Explore
      </button>
    </div>
  );
};

export default ProfileReview;
