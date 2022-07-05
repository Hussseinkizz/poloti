import { useState } from 'react';
import * as HiIcons from 'react-icons/hi';
import ComponentWrapper from '../components/ComponentWrapper';
// import Loader from '../components/Loader';

export default function about() {
  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        <div className="w-full md:w-1/2 p-2 pb-4 flex flex-col justify-center items-center gap-2 bg-gray-50 border rounded-md shadow-md mx-auto">
          {/* page header */}
          <h1 className="text-gray-800 text-center text-2xl font-bold">
            About Us
          </h1>
          <p className="text-gray-700 text-center text-xl font-semibold mb-4 pb-1 border-b">
            We connect land sellers to buyers.
          </p>
          <p className="px-6 text-center">
            Real estate agents can post their mogages, plots and estates through
            our platform which has a ton of visitors who are interested in
            finding their next home, land or settlement.
          </p>
        </div>
      </section>
    </ComponentWrapper>
    // <Loader type="main-loader" />
  );
}
