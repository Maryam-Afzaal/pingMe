const cities = [
  {
    name: "Lahore",
    flag: "🏙️",
    description: "Pakistan's cultural capital & tech hub",
    count: 120,
    gradient: "from-orange-100 to-amber-50",
    border: "border-orange-200",
  },
  {
    name: "Islamabad",
    flag: "🏛️",
    description: "Capital city with growing startup ecosystem",
    count: 85,
    gradient: "from-sky-100 to-blue-50",
    border: "border-sky-200",
  },
  {
    name: "Karachi",
    flag: "🌊",
    description: "Financial capital & largest city",
    count: 110,
    gradient: "from-teal-100 to-emerald-50",
    border: "border-teal-200",
  },
  {
    name: "Sahiwal",
    flag: "🌾",
    description: "Rising opportunities in Punjabi heartland",
    count: 24,
    gradient: "from-green-100 to-lime-50",
    border: "border-green-200",
  },
];

export default function CitiesSection() {
  return (
    <section className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Browse by City
        </h2>
        <p className="text-slate-500 text-sm">
          Opportunities near you, wherever you are in Pakistan
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <a
            key={city.name}
            href={`/?location=${city.name.toLowerCase()}`}
            className={`bg-gradient-to-br ${city.gradient} border ${city.border} rounded-2xl p-5 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 cursor-pointer block`}
          >
            <div className="text-3xl mb-3">{city.flag}</div>
            <h3 className="font-bold text-slate-900 text-base mb-1">{city.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {city.description}
            </p>
            <div className="text-xl font-extrabold text-slate-800">
              {city.count}+
              <span className="text-xs font-normal text-slate-500 ml-1">listings</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
