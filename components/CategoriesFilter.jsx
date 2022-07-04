import { useStore } from '../store/store';
import * as HiIcons from 'react-icons/hi';
import ComboBox from './ComboBox';

const CategoriesFilter = ({ categories }) => {
  const {
    state: { currentCategory },
    dispatch,
  } = useStore();

  return (
    <div className="flex flex-col relative  justify-between items-center mb-8 px-8 md:px-2 text-gray-800 md:flex-row">
      {/* Current category title */}
      <h1 className="flex justify-start items-center gap-2 text-base md:text-xl font-semibold text-gray-600">
        <span>
          <HiIcons.HiFolder />
        </span>
        <span className="capitalize">{currentCategory} :</span>
      </h1>
      {/* categories dropdown */}
      <ComboBox categories={categories} />
    </div>
  );
};

export default CategoriesFilter;
