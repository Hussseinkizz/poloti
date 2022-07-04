const CardsGrid = ({ children }) => {
  return (
    <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 px-8 sm:px-0 relative z-0">
      {children}
    </section>
  );
};

export default CardsGrid;
