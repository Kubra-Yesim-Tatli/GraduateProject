import React from "react";
import Card from "./Card";

const FeaturedProducts = () => {
  const items = [
    {
      id: 1,
      image: "img/img14.jfif",
      isNew: true,
      title: "Loudest à la Madison #1",
      description: "Ergonomics and meeting you where you work.",
      date: "22 April 2021",
      comments: 10,
      tags: ["Google", "Trending", "New"],
    },
    {
      id: 2,
      image: "img/img15.jfif",
      isNew: false,
      title: "Colorful Light Structures",
      description: "Discover colorful architecture and vibrant cityscapes.",
      date: "25 April 2021",
      comments: 8,
      tags: ["Art", "Trending"],
    },
    {
      id: 3,
      image: "img/img16.jfif",
      title: "Default Card Without Image",
      description: "This card has no image but works perfectly fine.",
    },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="text-center mb-8">
        <p className="text-blue-500 font-medium">Practice Advice</p>
        <h2 className="text-2xl font-bold text-gray-800">Featured Section</h2>
        <p className="text-gray-500 mt-2">
          Flexible cards for various content types.
        </p>
      </div>

      {/* Kartları Listeleme */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
        {items.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            isNew={item.isNew}
            title={item.title}
            description={item.description}
            date={item.date}
            comments={item.comments}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
