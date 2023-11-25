const PlayerAvatar = ( props:{imageUrl:string | undefined} ) => {
  // Check if imageUrl is provided and not an empty string
  if (!props.imageUrl) {
    console.log("avatar url undefined");
    return null;
  }

  return (
    <p>
      {/* Display the image */}
      <img src={props.imageUrl} alt="User-provided" />
    </p>
  );
};

export default PlayerAvatar;