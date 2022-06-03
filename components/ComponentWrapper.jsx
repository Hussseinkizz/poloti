// Wraps everything in main view into a responsive container

const ComponentWrapper = ({ children, wrap }) => {
  return (
    <section
      className={` mx-auto py-16 sm:py-24  lg:max-w-7xl ${
        wrap && 'px-4 sm:px-6 lg:px-8'
      }`}
    >
      {children}
    </section>
  );
};

export default ComponentWrapper;
