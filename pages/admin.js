// admin can view and do crud ops on all users and their posts
// this is a protected route, admin has to login first here to view anything
// admin logins first then we set admin
import { useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import SearchBox from '../components/SearchBox';

const admin = () => {
  const [admin, setAdmin] = useState(true);

  if (admin) {
    return (
      <ComponentWrapper wrap={true}>
        <section className="w-full grid place-items-center p-4 py-24 md:py-16">
          <h1 className="text-gray-800 capitalize font-bold text-xl sm:text-2xl md:text-3xl">
            Admin Dashboard
          </h1>
          <div className="w-full py-4 flex flex-col justify-center items-center gap-2">
            <div className="flex grow w-full md:w-2/6 relative">
              <SearchBox placeholder="search by land id, user id or location" />
            </div>
            <p>users or results here...</p>
          </div>
        </section>
      </ComponentWrapper>
    );
  }
  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        admin login
      </section>
    </ComponentWrapper>
  );
};

export default admin;
