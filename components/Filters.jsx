import Dropdown from './Dropdown';
// import { useStore } from '../hooks/useStore';

const priceOptions = [
  { option: 'Price' },
  { option: 'Below 5M' },
  { option: 'Below 10M' },
  { option: 'Below 20M' },
  { option: 'Kibanjampola' },
];

const sizeOptions = [
  { option: 'Size' },
  { option: '25 ku 50' },
  { option: '50 ku 50' },
  { option: '50 ku 100' },
  { option: '100 ku 100' },
];

// const { setState } = useStore();

// // manage price sorting
// const handlePrice = (value) => {
//   setState({
//     type: 'SET_CURRENT_PRICE_SORT',
//     price: value,
//   });
// };
// // manage size sorting
// const handleSize = (value) => {
//   setState({
//     type: 'SET_CURRENT_SIZE_SORT',
//     size: value,
//   });
// };

const Filters = ({ openCustomSearchModal }) => {
  return (
    <section className="mx-auto my-8 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-md relative">
      <div className="flex flex-col lg:flex-row items-center justify-between text-center">
        <div className="font-bold px-4 py-4 grow w-full lg:w-1/2">
          <input
            type="search"
            placeholder="type here to search land by location"
            className="font-bold px-4 py-4 w-full text-center grow rounded-md text-gray-500 transition-colors outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 truncate"
          />
        </div>
        <div className="flex items-center justify-between text-orange-400 text-center flex-wrap">
          <div className="font-bold px-4 py-4 grow">
            <Dropdown
              data={priceOptions}
              dataType="price"
              // handleSlection={(item) => handlePrice(item)}
            />
          </div>
          <div className="font-bold px-4 py-4 grow">
            <Dropdown
              data={sizeOptions}
              dataType="size"
              // handleSlection={(item) => handleSize(item)}
            />
          </div>
          <div className="px-4 py-4 grow">
            <button
              className="flex items-center justify-center text-orange-50 rounded-md bg-orange-400 hover:bg-orange-500 hover:text-orange-100 active:scale-110 transition duration-150 ease-in-out text:sm sm:text-base w-full p-2 text-center"
              onClick={openCustomSearchModal}
            >
              Custom Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
