function ShareButtons() {
  const shareOnFacebook = () => {
    alert("Shared on Facebook!");
  };

  return (
    <div className="flex gap-2 mt-4">
      <button 
        onClick={shareOnFacebook}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Facebook
      </button>
      <button className="bg-blue-400 text-white px-3 py-1 rounded">
        Twitter
      </button>
      <button className="bg-red-600 text-white px-3 py-1 rounded">
        Pinterest
      </button>
    </div>
  );
}

export default ShareButtons;