import ComponentWrapper from '../components/ComponentWrapper';
import SearchBox from '../components/SearchBox';
// import Loader from '../components/Loader';

const signup = () => {
  return (
    <ComponentWrapper wrap={true}>
      <div className="pt-16 mb-8">signup</div>
      {/* <SearchBox placeholder="type to search land by location" /> */}
      <SearchBox />
    </ComponentWrapper>
    // <Loader type="main-loader" />
  );
};

export default signup;
