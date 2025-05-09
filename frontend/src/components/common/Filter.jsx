export default function Filter({ platforms, filter, toggleFilter }) {
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md mt-4 hover:bg-gray-50 transition-colors duration-300">
      <div className="text-xl font-semibold text-gray-800 mb-4">
        Filter by Platform
      </div>
      <hr className="mb-4" />

      <div className="space-y-3">
        {platforms.map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-gray-100 p-2 rounded-md"
          >
            {/* Label for each platform */}
            <label htmlFor={item} className="w-1/2 text-gray-600 capitalize">
              {item}
            </label>

            <div className="flex justify-center items-center w-1/2 space-x-3">
              {/* Visibility checkbox */}
              <input
                type="checkbox"
                checked={!filter[item]} // The checkbox will reflect the visibility of the platform
                onChange={() => toggleFilter(item)}
                className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer border-gray-300 rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
