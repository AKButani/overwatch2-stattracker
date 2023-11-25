const PlayerNameWithBackground = (props:{ playerName: string, imageUrl: string }) => {

  const containerStyle = {
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    width: '20%', // should somehow be synced with rest of layout
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <h2 style={containerStyle}>
        {props.playerName}
    </h2>
  );
};

export default PlayerNameWithBackground;
