const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-indigo-500 opacity-50">
      <div className="flex min-h-screen w-full items-center justify-center opacity-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
          <div className="h-9 w-9 rounded-full bg-indigo-500 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
