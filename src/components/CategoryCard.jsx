const CategoryCard = ({ image, label }) => {
    return (
      <div className="relative aspect-w-1 aspect-h-1">
       
        <img src={image} alt={label} className="w-full h-full object-cover" />
        
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 font-bold shadow-md transition duration-300 hover:bg-gray-100">
          {label}
        </button>
      </div>
    );
  };
  
  export default CategoryCard;
  