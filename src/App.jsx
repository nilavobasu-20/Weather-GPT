import { useMemo, useState } from "react";
import {
  CloudRain,
  SunMedium,
  CloudFog,
  Wind,
  MapPin,
  Droplets,
  Gauge,
  Loader2,
  Sparkles,
  Cloudy,
  Send,
  Bot,
  User,
  Cloud,
  X,
} from "lucide-react";

const weatherData = {
  clear: {
    temp: 31,
    condition: "Very Hot",
    summary: "Sunny and blazing",
    accent: "from-orange-400 via-amber-300 to-yellow-100",
    bg: "from-orange-500/90 via-amber-400/85 to-yellow-200/80",
    card: "bg-white/15 border-white/20",
    ring: "ring-orange-300/60",
    icon: SunMedium,
    description: "The sky is bright and warm. Stay hydrated and use sunscreen.",
    gradientGlow: "shadow-orange-500/30",
  },
  rain: {
    temp: 22,
    condition: "Raining",
    summary: "Cool and wet",
    accent: "from-sky-600 via-cyan-500 to-slate-300",
    bg: "from-slate-800/95 via-slate-700/90 to-sky-600/85",
    card: "bg-slate-900/20 border-sky-200/20",
    ring: "ring-sky-300/40",
    icon: CloudRain,
    description: "Light rain is active. Keep an umbrella and stay cozy indoors.",
    gradientGlow: "shadow-sky-600/30",
  },
  cloudy: {
    temp: 26,
    condition: "Cloudy",
    summary: "Soft skies",
    accent: "from-gray-400 via-blue-300 to-indigo-200",
    bg: "from-gray-500/85 via-blue-400/75 to-indigo-300/70",
    card: "bg-slate-200/10 border-slate-100/20",
    ring: "ring-slate-300/40",
    icon: Cloudy,
    description: "Puffy clouds cover the sky. A pleasant day with gentle winds.",
    gradientGlow: "shadow-blue-400/30",
  },
  mist: {
    temp: 18,
    condition: "Misty",
    summary: "Foggy air",
    accent: "from-emerald-500 via-teal-400 to-cyan-300",
    bg: "from-teal-800/95 via-emerald-700/90 to-cyan-600/85",
    card: "bg-cyan-100/10 border-white/10",
    ring: "ring-cyan-300/40",
    icon: CloudFog,
    description: "Thick mist reduces visibility. Serene and cool atmosphere.",
    gradientGlow: "shadow-teal-600/30",
  },
  snowy: {
    temp: -2,
    condition: "Snowing",
    summary: "Cold and crisp",
    accent: "from-blue-300 via-cyan-200 to-white",
    bg: "from-blue-900/95 via-blue-700/90 to-cyan-400/85",
    card: "bg-white/10 border-cyan-200/20",
    ring: "ring-cyan-200/60",
    icon: Cloud,
    description: "Beautiful snow falling. Bundle up and enjoy the winter wonderland!",
    gradientGlow: "shadow-blue-400/30",
  },
};

const indianStatesAndCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati", "Nellore", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezu", "Changlang"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Nagaon", "Tezpur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Ponda", "Bicholim"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Haryana: ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Kangra", "Kullu"],
  Jharkhand: ["Ranchi", "Dhanbad", "Giridih", "Bokaro", "Jamshedpur"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kottayam", "Kannur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul"],
  Meghalaya: ["Shillong", "Tura", "Nongpoh", "Cherrapunji", "Baghmara"],
  Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Serchhip"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Balasore"],
  Punjab: ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner"],
  Sikkim: ["Gangtok", "Pelling", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Ambassa", "Kailashahar", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  Uttarakhand: ["Dehradun", "Nainital", "Rishikesh", "Haridwar", "Almora"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Asansol", "Durgapur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Noida", "Gurgaon"],
};

const presets = [
  { city: "Mumbai", state: "Maharashtra", type: "clear" },
  { city: "Delhi", state: "Delhi", type: "rain" },
  { city: "Bangalore", state: "Karnataka", type: "cloudy" },
  { city: "Shimla", state: "Himachal Pradesh", type: "snowy" },
];

const professions = ["Student", "Farmer", "Employee", "Businessman"];

function AnimatedBackground({ type }) {
  if (type === "clear") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-amber-400/85 to-yellow-200/80" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400/30 rounded-full floating-orb blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/20 rounded-full floating-orb-reverse blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-300/25 rounded-full floating-orb-slow blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3),transparent_30%)]" />
      </>
    );
  }

  if (type === "rain") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-sky-600/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,65,85,0.4),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="rain-drop absolute w-1 h-16 bg-gradient-to-b from-cyan-300/60 to-cyan-400/20 blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-10 right-20 w-64 h-64 bg-slate-600/40 rounded-full floating-orb blur-3xl" />
      </>
    );
  }

  if (type === "cloudy") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/85 via-blue-400/75 to-indigo-300/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_40%)]" />
        <div className="absolute top-10 left-10 w-80 h-40 bg-white/20 rounded-full floating-orb blur-3xl" />
        <div className="absolute top-1/3 right-20 w-96 h-48 bg-indigo-300/30 rounded-full floating-orb-reverse blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-72 h-56 bg-blue-300/25 rounded-full floating-orb-slow blur-3xl" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,rgba(255,255,255,0.05)_2px)]" />
      </>
    );
  }

  if (type === "mist") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800/95 via-emerald-700/90 to-cyan-600/85" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="mist-layer absolute w-full h-1/3 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-2xl"
              style={{
                top: `${i * 30}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full floating-orb blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/25 rounded-full floating-orb-reverse blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(6,182,212,0.1),transparent_60%)]" />
      </>
    );
  }

  if (type === "snowy") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-700/90 to-cyan-400/85" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snowflake absolute w-2 h-2 bg-white rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.4,
                filter: `drop-shadow(0 0 ${Math.random() * 2}px rgba(255,255,255,0.8))`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full floating-orb blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/15 rounded-full floating-orb-reverse blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,200,255,0.1),transparent_60%)]" />
      </>
    );
  }
}

function ProfessionModal({ isOpen, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome! 👋</h2>
          <p className="text-white/70 text-lg">Describe your profession</p>
        </div>

        <div className="space-y-4">
          {professions.map((profession) => (
            <button
              key={profession}
              onClick={() => onSelect(profession)}
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-white/50 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {profession}
            </button>
          ))}
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          This helps us provide personalized weather insights
        </p>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState("Delhi");
  const [selectedType, setSelectedType] = useState("clear");
  const [showProfessionModal, setShowProfessionModal] = useState(true);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your Weather GPT Assistant. I can help you with weather forecasts for any Indian city or state. What location interests you?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const weather = useMemo(() => {
    return weatherData[selectedType] || weatherData.clear;
  }, [selectedType]);

  const Icon = weather.icon;

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    setShowProfessionModal(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const lowerInput = inputValue.toLowerCase();
    const matchedState = Object.keys(indianStatesAndCities).find((state) =>
      lowerInput.includes(state.toLowerCase())
    );

    setTimeout(() => {
      let aiResponse = "";

      if (matchedState) {
        setSelectedState(matchedState);
        const cities = indianStatesAndCities[matchedState].join(", ");
        aiResponse = `Great! ${matchedState} is a beautiful state. Popular cities there include: ${cities}. Which one would you like to explore?`;
      } else if (lowerInput.includes("weather") || lowerInput.includes("temperature")) {
        const weatherAdvice = [
          "Stay hydrated! 💧 Consider using sunscreen and light clothing.",
          "Perfect weather for outdoor activities! 🌤️",
          "Keep an umbrella handy and stay indoors if possible. ☔",
          "Snowy weather - beautiful views but reduced visibility! ❄️",
        ];
        aiResponse = `The weather in ${city} is currently ${weather.condition}. Temperature is ${weather.temp}°C. ${weatherAdvice[Math.floor(Math.random() * weatherAdvice.length)]}`;
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hello! 👋 How can I assist you with weather information today?";
      } else if (lowerInput.includes("help")) {
        aiResponse = "I can help you with:\n• Weather forecasts for Indian cities\n• State and city information\n• Temperature and humidity details\n• Weather-based recommendations\n\nJust ask me anything about the weather!";
      } else {
        const randomResponses = [
          `Interesting question! Let me check the weather for ${inputValue}. Currently showing data for ${city}.`,
          "That's a great query! 🌤️ Would you like detailed weather information for a specific city?",
          "I'm here to help with weather forecasts across India. Feel free to ask about any Indian city!",
        ];
        aiResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      }

      const aiMsg = {
        id: Date.now(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);

    setInputValue("");
  };

  const handleStateSelection = (state) => {
    setSelectedState(state);
    const firstCity = indianStatesAndCities[state][0];
    setCity(firstCity);
  };

  const handleCitySelection = (cityName) => {
    const userMsg = {
      id: Date.now(),
      text: `Show me weather for ${cityName}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setCity(cityName);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        text: `The weather in ${cityName} is currently ${weather.condition}. Temperature: ${weather.temp}°C, Humidity: 68%, Wind: 18 km/h. ${weather.description}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="min-h-screen overflow-hidden text-white transition-all duration-700 relative">
      <AnimatedBackground type={selectedType} />

      {/* Profession Modal */}
      <ProfessionModal isOpen={showProfessionModal} onSelect={handleProfessionSelect} />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
              <Sparkles className="h-5 w-5 text-yellow-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                Weather GPT
              </p>
              <h1 className="text-xl font-semibold">Smart Forecast</h1>
            </div>
          </div>

          {selectedProfession && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="text-sm text-white/70">Profession:</span>
              <span className="text-sm font-semibold text-white">{selectedProfession}</span>
            </div>
          )}

          <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/20 hover:border-white/40 hover:shadow-lg">
            Daily briefing
          </button>
        </header>

        <section className="grid flex-1 gap-6 xl:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div className={`relative overflow-hidden rounded-[30px] border ${weather.card} shadow-2xl ${weather.gradientGlow} backdrop-blur-xl`}>
              <div className="absolute inset-0 bg-white/5" />
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/10">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                          Live location
                        </p>
                        <h2 className="text-2xl font-bold">{city}</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md w-fit">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
                      <span className="text-sm text-white/90">Updated just now</span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-[28px] bg-gradient-to-br ${weather.accent} p-4 shadow-lg`}>
                        <Icon className="h-16 w-16 text-white drop-shadow-lg" />
                      </div>
                      <div>
                        <p className="text-6xl font-black tracking-tight">{weather.temp}°</p>
                        <p className="mt-2 text-xl font-medium text-white/90">
                          {weather.condition}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-lg text-white/80">{weather.summary}</p>
                      <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                        {weather.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {presets.map((preset) => (
                        <button
                          key={preset.city}
                          onClick={() => {
                            setCity(preset.city);
                            setSelectedType(preset.type);
                          }}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition transform hover:scale-105 ${
                            city === preset.city
                              ? "border-white/50 bg-white/20 shadow-lg"
                              : "border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 hover:shadow-md"
                          }`}
                        >
                          {preset.city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-black/10 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Current Forecast
                </p>
                <Loader2 className="h-4 w-4 animate-spin text-white/70" />
              </div>

              <div className="space-y-4">
                {[
                  { label: "Humidity", value: "68%", icon: Droplets },
                  { label: "Wind", value: "18 km/h", icon: Wind },
                  { label: "Air Pressure", value: "1013 hPa", icon: Gauge },
                ].map(({ label, value, icon: IconItem }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10 hover:border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <IconItem className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-white/80">{label}</span>
                    </div>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/15 bg-black/20 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[calc(100vh-150px)]">
            <div className="bg-gradient-to-r from-white/10 to-white/5 p-4 border-b border-white/15 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Weather AI Assistant</p>
                <p className="text-xs text-white/60">Always available for weather queries</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-fade-in ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 ${
                      msg.sender === "user"
                        ? "bg-white/20 border border-white/30 text-white"
                        : "bg-white/10 border border-white/20 text-white/90"
                    }`}
                  >
                    <p className="text-sm leading-6 break-words">{msg.text}</p>
                    <p className="text-xs text-white/50 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!selectedState && (
              <div className="border-t border-white/15 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-3">Quick States</p>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {Object.keys(indianStatesAndCities)
                    .slice(0, 8)
                    .map((state) => (
                      <button
                        key={state}
                        onClick={() => handleStateSelection(state)}
                        className="text-left px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/25 hover:border-cyan-300/60 text-xs text-white/80 transition border border-white/15 transform hover:scale-105 font-medium hover:shadow-md"
                      >
                        {state}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {selectedState && (
              <div className="border-t border-white/15 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-3">
                  Cities in {selectedState}
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {indianStatesAndCities[selectedState].map((cityName) => (
                    <button
                      key={cityName}
                      onClick={() => handleCitySelection(cityName)}
                      className="text-left px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/25 hover:border-cyan-300/60 text-xs text-white/80 transition border border-white/15 transform hover:scale-105 font-medium hover:shadow-md"
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/15 bg-white/5 p-4">
              <div className="flex gap-3">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about weather in any Indian city..."
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:bg-white/15"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:from-cyan-400 hover:to-blue-500 transition transform hover:scale-110"
                >
                  <Send className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
