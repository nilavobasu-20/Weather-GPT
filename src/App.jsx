import { useMemo, useState } from "react";
import {
  CloudRain,
  SunMedium,
  CloudFog,
  Wind,
  MapPin,
  Droplets,
  Gauge,
  LoaderCircle,
  Sparkles,
  Cloudy,
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

const presets = [
  { city: "New York", type: "clear" },
  { city: "London", type: "rain" },
  { city: "Tokyo", type: "cloudy" },
  { city: "Paris", type: "mist" },
];

function App() {
  const [city, setCity] = useState("Delhi");
  const [selectedType, setSelectedType] = useState("clear");

  const weather = useMemo(() => {
    return weatherData[selectedType] || weatherData.clear;
  }, [selectedType]);

  const Icon = weather.icon;

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

        <section className="grid flex-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div
            className={`relative overflow-hidden rounded-[30px] border ${weather.card} shadow-2xl ${weather.gradientGlow} backdrop-blur-xl`}
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
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

                  <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
                    <span className="text-sm text-white/90">Updated just now</span>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
                          onClick={() => setSelectedType(preset.type)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            selectedType === preset.type
                              ? "border-white/50 bg-white/20"
                              : "border-white/20 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          {preset.city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-white/15 bg-black/10 p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                        Forecast
                      </p>
                      <LoaderCircle className="h-4 w-4 animate-spin text-white/70" />
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
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/70">
                Search city
              </p>

              <div className="space-y-4">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full rounded-2xl border border-white/15 bg-black/10 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/40"
                />

                <button
                  onClick={() => {
                    if (city.toLowerCase().includes("rain")) setSelectedType("rain");
                    else if (city.toLowerCase().includes("sun")) setSelectedType("clear");
                    else if (city.toLowerCase().includes("cloud")) setSelectedType("cloudy");
                    else if (city.toLowerCase().includes("fog")) setSelectedType("mist");
                    else setSelectedType("clear");
                  }}
                  className="w-full rounded-2xl bg-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/25"
                >
                  Check weather
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-black/10 p-5 shadow-xl backdrop-blur-xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/70">
                This afternoon
              </p>

              <div className="space-y-3">
                {[
                  { time: "12:00", temp: "32°", label: "Hot" },
                  { time: "15:00", temp: "34°", label: "Peak heat" },
                  { time: "18:00", temp: "29°", label: "Cooler" },
                ].map((slot) => (
                  <div
                    key={slot.time}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <div>
                      <p className="text-sm text-white/60">{slot.time}</p>
                      <p className="text-sm font-medium text-white/90">{slot.label}</p>
                    </div>
                    <p className="text-lg font-bold">{slot.temp}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
