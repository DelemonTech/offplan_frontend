import { useEffect, useState } from "react";

const GalleryPage = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    if (stored) {
      setImages(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery</h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images available.</p>
      )}
    </div>
  );
};

export default GalleryPage;
