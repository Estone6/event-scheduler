const DayOfWeekHeader = () => (
  <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
    <div className="bg-white py-2">
      S<span className="sr-only sm:not-sr-only">un</span>
    </div>
    <div className="bg-white py-2">
      M<span className="sr-only sm:not-sr-only">on</span>
    </div>
    <div className="bg-white py-2">
      T<span className="sr-only sm:not-sr-only">ue</span>
    </div>
    <div className="bg-white py-2">
      W<span className="sr-only sm:not-sr-only">ed</span>
    </div>
    <div className="bg-white py-2">
      T<span className="sr-only sm:not-sr-only">hu</span>
    </div>
    <div className="bg-white py-2">
      F<span className="sr-only sm:not-sr-only">ri</span>
    </div>
    <div className="bg-white py-2">
      S<span className="sr-only sm:not-sr-only">at</span>
    </div>
  </div>
);

export default DayOfWeekHeader;
