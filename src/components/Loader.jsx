import './Loader.css';

function Loader() {
  return (
    <div className="loader-screen">
      <div className="spinner">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="spinner-bar"
            style={{
              transform: `rotate(${i * 18}deg) translateY(-30px)`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loader;
