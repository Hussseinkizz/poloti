import * as HiIcons from 'react-icons/hi';

const SalesView = () => {
  return (
    <section className="rounded-md shadow-md">
      <div className="p-4 flex justify-between items-center bg-gray-100 rounded-t-md border-b border-gray-200">
        {/* Title */}
        <h1 className="font-bold text-lg">Sales Made This Month</h1>
        {/* Action Button */}
        <button className="flex justify-between items-center gap-1 font-small bg-blue-500 text-white px-2 rounded-md">
          <span>
            <HiIcons.HiPlus />
          </span>
          <span>New Item</span>
        </button>
      </div>
      {/* Sales Table */}
      <table className="w-full bg-gray-50 grid grid-cols-8">
        {/* column 1 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>a</td>
            <td>b</td>
          </div>
        </div>
        {/* column 2 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 3 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 4 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 5 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 6 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 7 */}
        <div className="border-r border-gray-200">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
        {/* column 8 */}
        <div className="foo">
          <div className="grid grid-flow-row">
            <td>c</td>
            <td>d</td>
          </div>
        </div>
      </table>
    </section>
  );
};

export default SalesView;
