import { useState, Fragment } from 'react';
import { useStore } from '../store/store';
import { Combobox } from '@headlessui/react';
import * as HiIcons from 'react-icons/hi';

const ComboBox = ({ categories }) => {
  // Pass the current selectedCategory to the global state after the user has selected a new category.
  const [temporarySelection, setTemporarySelection] = useState('');
  const { state, dispatch } = useStore();
  const handleSelection = () => {
    dispatch({
      type: 'SET_CURRENT_CATEGORY',
      category: temporarySelection,
    });
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((category) => {
          return category.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox value={selectedCategory} onChange={setSelectedCategory}>
        {({ activeOption }) => (
          <section className="relative">
            <div className="focus:outline-none relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-400 sm:text-sm w-48">
              <div className="flex-col p-2 items-center justify-center md:flex-row text-sm leading-5 md:text-base">
                <span className="text-blue-500 font-semibold">
                  <Combobox.Label>Change Category:</Combobox.Label>
                </span>
                <Combobox.Input
                  className="border-none  text-sm leading-5 text-gray-900 focus:ring-0 capitalize focus:outline-none md:text-base"
                  displayValue={(category) => category}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiIcons.HiOutlineSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
            </div>
            {/* The Results */}
            <div className="z-10 absolute">
              <Combobox.Options>
                {filteredCategories.length === 0 && query !== '' ? (
                  <div className="cursor-default select-none py-2 px-4 text-gray-700 bg-white shadow-lg rounded-b-lg w-48">
                    Nothing found.
                  </div>
                ) : (
                  filteredCategories &&
                  filteredCategories.length &&
                  filteredCategories.map((category) => (
                    /* Use the `active` state to conditionally style the active option. */
                    /* Use the `selected` state to conditionally style the selected option. */
                    <div
                      className="bg-white shadow-lg rounded-b-lg w-48 cursor-pointer"
                      key={category}
                    >
                      <Combobox.Option value={category} as={Fragment}>
                        {({ active, selected }) => (
                          <li
                            className={`flex items-center px-4 gap-2 capitalize ${
                              active
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-900'
                            }`}
                            onClick={handleSelection}
                          >
                            {selected && (
                              <HiIcons.HiCheck
                                className="h-5 w-5 text-blue-500"
                                aria-hidden="true"
                              />
                            )}
                            {category}
                          </li>
                        )}
                      </Combobox.Option>
                    </div>
                  ))
                )}
              </Combobox.Options>
            </div>
            {activeOption && setTemporarySelection(activeOption)}
          </section>
        )}
      </Combobox>
    </>
  );
};

export default ComboBox;
