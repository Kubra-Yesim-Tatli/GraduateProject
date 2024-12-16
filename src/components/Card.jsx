import React from "react";

const Card = ({
  image,
  isNew = false,
  title = "Default Title",
  description = "This is a default description.",
  date = "",
  comments = "",
  tags = [],
  linkText = "Learn More",
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-full md:w-1/2">
      {/* Görsel */}
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* İçerik */}
      <div className="p-4">
        {/* Etiketler */}
        {tags.length > 0 && (
          <p className="text-xs text-gray-400 mb-1">
            {tags.map((tag, index) => (
              <span key={index} className="text-blue-500 mr-1">
                {tag}
              </span>
            ))}
          </p>
        )}

        {/* Başlık */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>

        {/* Açıklama */}
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Tarih ve Yorum */}
        {(date || comments) && (
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            {date && <span>📅 {date}</span>}
            {comments && <span>💬 {comments} comments</span>}
          </div>
        )}

        {/* Learn More */}
        <a
          href="#"
          className="text-blue-500 text-sm hover:underline inline-block"
        >
          {linkText} →
        </a>
      </div>
    </div>
  );
};

export default Card;
