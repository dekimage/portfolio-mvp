const PricingTier = ({ price, title, features, onScheduleCall }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">${price}</h3>
        <h4 className="text-xl font-semibold mb-4">{title}</h4>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={onScheduleCall}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule Call
        </button>
      </div>
    </div>
  );
};

export default PricingTier;
