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
  Mic,
} from "lucide-react";

const weatherData = {
  clear: {
    temp: 31,
    condition: "Very Hot",
    summary: "Sunny and blazing",
    accent: "from-orange-500 via-amber-400 to-yellow-200",
    bg: "from-orange-500/80 via-amber-400/70 to-yellow-200/80",
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
    bg: "from-sky-700/90 via-cyan-600/80 to-slate-800/90",
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
    accent: "from-slate-500 via-slate-400 to-sky-200",
    bg: "from-slate-600/80 via-slate-500/70 to-sky-200/60",
    card: "bg-slate-200/10 border-slate-100/20",
    ring: "ring-slate-300/40",
    icon: Cloudy,
    description: "Clouds are covering the sun, making the day feel mild and comfortable.",
    gradientGlow: "shadow-slate-500/30",
  },
  mist: {
    temp: 24,
    condition: "Misty",
    summary: "Moody air",
    accent: "from-slate-400 via-zinc-300 to-neutral-200",
    bg: "from-slate-500/80 via-zinc-500/70 to-neutral-300/60",
    card: "bg-neutral-100/10 border-white/10",
    ring: "ring-neutral-300/40",
    icon: CloudFog,
    description: "Visibility is reduced and the air feels cool and humid.",
    gradientGlow: "shadow-zinc-500/30",
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
  Himachal Pradesh: ["Shimla", "Mandi", "Solan", "Kangra", "Kullu"],
  Jharkhand: ["Ranchi", "Dhanbad", "Giridih", "Bokaro", "Jamshedpur"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kottayam", "Kannur"],
  Madhya Pradesh: ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
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
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Noida", "Gurgaon"],
};

const aiResponses = {
  greeting: [
    "Hello! 👋 I'm your Weather GPT Assistant. I can help you with weather forecasts for any Indian city or state. What location interests you?",
    "Namaste! 🙏 Welcome to Weather GPT. I'm here to provide detailed weather insights and forecasts for Indian cities. Where would you like to know about?",
  ],
  weather_query: [
    "The weather in {city} is currently {condition}. It's {temp}°C with {humidity}% humidity. {advice}",
    "According to our latest data, {city} is experiencing {condition} weather with a temperature of {temp}°C. {advice}",
  ],
  location_suggestion: [
    "Popular cities in {state} include: {cities}. Which one would you like to check?",
    "Did you know? {state} has wonderful cities like {cities}. Would you like weather for any of these?",
  ],
};

const presets = [
  { city: "Mumbai", state: "Maharashtra", type: "clear" },
  { city: "Delhi", state: "Delhi", type: "rain" },
  { city: "Bangalore", state: "Karnataka", type: "cloudy" },
  { city: "Shimla", state: "Himachal Pradesh", type: "mist" },
];

function App() {
  const [city, setCity] = useState("Delhi");
  const [selectedType, setSelectedType] = useState("clear");
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

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";

      const lowerInput = inputValue.toLowerCase();

      // Check for state queries
      const matchedState = Object.keys(indianStatesAndCities).find(
        (state) => lowerInput.includes(state.toLowerCase())
      );

      if (matchedState) {
        setSelectedState(matchedState);
        const cities = indianStatesAndCities[matchedState].join(", ");
        aiResponse = `Great! ${matchedState} is a beautiful state. Popular cities there include: ${cities}. Which one would you like to explore?`;
      }
      // Check for city queries
      else if (lowerInput.includes("weather") || lowerInput.includes("temperature")) {
        const weatherAdvice = [
          "Stay hydrated! 💧 Consider using sunscreen and light clothing.",
          "Perfect weather for outdoor activities! 🌤️",
          "Keep an umbrella handy and stay indoors if possible. ☔",
          "Misty weather - beautiful views but reduced visibility! 🌫️",
        ];
        aiResponse = `The weather in ${city} is currently ${weather.condition}. Temperature is ${weather.temp}°C. ${weatherAdvice[Math.floor(Math.random() * weatherAdvice.length)]}`;
        setCity(inputValue.split(" ")[0] || city);
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hello! 👋 How can I assist you with weather information today?";
      } else if (lowerInput.includes("help")) {
        aiResponse = "I can help you with:\n• Weather forecasts for Indian cities\n• State and city information\n• Temperature and humidity details\n• Weather-based recommendations\n\nJust ask about any city in India!";
      } else {
        const randomResponses = [
          `Interesting question! Let me check the weather for ${inputValue}. Currently showing data for ${city}.`,
          "That's a great query! 🌤️ Would you like detailed weather information for a specific city?",
          "I'm here to help with weather forecasts across India. Feel free to ask about any Indian city!",
        ];
        aiResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      }

      const aiMsg = {
        id: messages.length + 2,
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
    setCity(cityName);
    const userMsg = {
      id: messages.length + 1,
      text: `Show me weather for ${cityName}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMsg]);

    setTimeout(() => {
      const aiMsg = {
        id: messages.length + 2,
        text: `The weather in ${cityName} is currently ${weather.condition}. Temperature: ${weather.temp}°C, Humidity: 68%, Wind: 18 km/h. ${weather.description}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div
      className={`min-h-screen overflow-hidden bg-gradient-to-br ${weather.bg} text-white transition-all duration-700`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_35%)]" />

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

          <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/15">
            Daily briefing
          </button>
        </header>

        <section className="grid flex-1 gap-6 xl:grid-cols-[1fr_1.2fr]">
          {/* Left Panel - Weather Dashboard */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
            <div
              className={`relative overflow-hidden rounded-[30px] border ${weather.card} shadow-2xl ${weather.gradientGlow} backdrop-blur-xl`}
            >
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
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            city === preset.city
                              ? "border-white/50 bg-white/20"
                              : "border-white/20 bg-white/5 hover:bg-white/10"
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

            {/* Forecast Details */}
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
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
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

          {/* Right Panel - AI Chat */}
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

            {/* Messages Container */}
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

            {/* States Quick Access */}
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
                        className="text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white/80 transition"
                      >
                        {state}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Cities Quick Access */}
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
                      className="text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white/80 transition"
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
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
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg transition"
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
