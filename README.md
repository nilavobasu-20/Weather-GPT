# Weather GPT Frontend

A modern, aesthetic weather application built with React and Tailwind CSS. The UI dynamically changes based on weather conditions with smooth transitions and glassmorphism effects.

## Features

✨ **Dynamic Weather Themes**
- Hot & Sunny: Warm orange/amber/yellow gradients
- Rainy: Cool blue/cyan gradients
- Cloudy: Gray/slate tones
- Misty: Neutral cool aesthetics

🎨 **Modern UI Design**
- Glassmorphism effects with backdrop blur
- Smooth background transitions
- Aesthetic color palettes
- Responsive grid layout
- Custom scrollbar styling

⚡ **Features**
- City search functionality
- Real-time weather status indicator
- Forecast details (Humidity, Wind, Air Pressure)
- Hourly temperature preview
- Preset city shortcuts (New York, London, Tokyo, Paris)
- Smooth animations and transitions

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Project Structure

```
weather-gpt/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx           # Main weather component with dynamic theming
│   ├── index.js          # React entry point
│   └── index.css         # Global styles with Tailwind
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS preprocessor

## Key Components

### Weather Data Object
Defines themes for each weather condition:
- Temperature
- Weather condition text
- Color gradients
- Icons
- Descriptions

### Main Features
1. **Weather Display** - Large temperature display with condition icon
2. **City Search** - Search input to change location
3. **Forecast Section** - Current weather metrics
4. **Hourly Preview** - Temperature forecast throughout the day
5. **Quick Presets** - One-click weather simulation

## Color Schemes

**Clear/Hot** 🌞
- Gradient: Orange → Amber → Yellow
- Accent: Warm tones

**Rainy** 🌧️
- Gradient: Sky Blue → Cyan → Slate
- Accent: Cool water tones

**Cloudy** ☁️
- Gradient: Slate → Sky Blue
- Accent: Muted tones

**Misty** 🌫️
- Gradient: Slate → Zinc → Neutral
- Accent: Cool neutral tones

## Future Enhancements

- [ ] Integration with real weather API (OpenWeatherMap, WeatherAPI)
- [ ] Geolocation support
- [ ] Detailed forecast (7-day, 14-day)
- [ ] Weather alerts and warnings
- [ ] Dark/Light theme toggle
- [ ] AI-powered weather insights (GPT integration)
- [ ] Precipitation chart visualization
- [ ] Air quality indicators

## License

MIT
