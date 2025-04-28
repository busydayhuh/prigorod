function Loader({ className }) {
  return (
    <div
      className={`absolute top-10 md:top-20 w-full flex justify-center ${className}`}
    >
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
