const PlayerAvatar = ( props:{imageUrl:string | undefined} ) => {
  if (!props.imageUrl) {
    console.log("avatar url undefined");
    return null;
  }

  return (
    <p>
      <img src={props.imageUrl} alt="User-provided" />
    </p>
  );
};

export default PlayerAvatar;