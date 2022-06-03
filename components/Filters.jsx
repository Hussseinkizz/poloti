const Filters = () => {
  return (
    <section className="mx-auto bg-gray-900 sticky">
      <div className="flex items-center justify-between text-orange-400 text-center overflow-hidden">
        <button className="font-bold hover:bg-gray-800 transition px-4 py-4 grow">
          Location
        </button>
        <button className="font-bold hover:bg-gray-800 transition px-4 py-4 grow">
          Price
        </button>
        <button className="font-bold hover:bg-gray-800 transition px-4 py-4 grow">
          Size
        </button>
      </div>
    </section>
  );
};

export default Filters;
