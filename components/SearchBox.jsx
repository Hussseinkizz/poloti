import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchBox = ({ placeholder, data }) => {
  const [filiteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const searchData = [
    { id: 1, title: 'title 1' },
    { id: 2, title: 'title 2' },
    { id: 3, title: 'title 3' },
    { id: 4, title: 'title 4' },
    { id: 5, title: 'title 5' },
    { id: 6, title: 'title 6' },
  ];

  const filterData = (event) => {
    let searchValue = event.target.value;
    const results = searchData.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredData(results);
  };

  return (
    <section className="w-full relative">
      <div className="flex grow items-center justify-between rounded-md realtive">
        {/* The Input */}
        <input
          type="text"
          placeholder={placeholder ? placeholder : 'Search...'}
          onChange={filterData}
          className="grow outline-none border-transparent relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
        />
        {/* The Search Icon */}
        <div className="absolute right-4 text-gray-400">
          <HiSearch className="h-6 w-6 cursor-pointer transition hover:text-orange-400" />
        </div>
      </div>
      {/* The Results */}
      {filiteredData.length !== 0 && (
        <div className="abosolute z-10 bg-white shadow-lg rounded-md mt-3 p-2 flex flex-col items-center justify-center gap-2 overflow-hidden overflow-y-auto search-results-custom">
          {filiteredData.map((item, index) => (
            <span key={index}>{item.title}</span>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBox;
