import CategoryCard from './CategoryCard';

const EditorsPickSection = () => {
  const categories = [
    { image: '/img/img2.jfif', label: 'MEN' },
    { image: '/img/img3.jfif', label: 'WOMEN' },
    { image: '/img/img4.jfif', label: 'ACCESSORIES' },
    { image: '/img/img5.jfif', label: 'KIDS' },
  ];

  return (
    <div className="bg-white px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">EDITOR'S PICK</h2>
        <p className="text-sm text-gray-500">Problems trying to resolve the conflict between</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryCard image={categories[0].image} label={categories[0].label} className="h-full" />
          <CategoryCard image={categories[1].image} label={categories[1].label} className="h-full" />
        </div>

        
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <CategoryCard image={categories[2].image} label={categories[2].label} className="h-1/2 md:h-full" />
          <CategoryCard image={categories[3].image} label={categories[3].label} className="h-1/2 md:h-full" />
        </div>
      </div>
    </div>
  );
};

export default EditorsPickSection;
