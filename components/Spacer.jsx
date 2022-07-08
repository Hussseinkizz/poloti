// * responsive layout vertical & horizontal spacing component!
const Spacer = ({ type }) => {
  if (type === 'vertical') {
    return (
      <div
        id="layout-spacer-vertical"
        className="w-full min-h-custom h-full flex grow flex-col justify-center items-center"
      />
    );
  }

  // horizontal spacing by default
  return (
    <div
      id="layout-spacer-horizontal"
      className="w-full flex grow justify-center items-center"
    />
  );
};

export default Spacer;
