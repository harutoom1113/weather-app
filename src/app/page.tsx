"use client";

import { useState } from "react";

export default function Page() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 英字（a〜z, A〜Z）のみを許可
    if (/^[a-zA-Z]*$/.test(value)) {
      setCity(value);
    }
  };

  async function getData(id: string) {
    const res = await fetch(`/api/weatherinfo?city=${id}`);
    const data = await res.json();
    setData(data.weatherData.weather[0].description);
    setCity(data.weatherData.name);
    setTemp(data.weatherData.main.temp);
    setIcon(data.weatherData.weather[0].icon);
  }

  return (
    <div className="text-center mt-8 flex flex-col items-center bg-white">
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="enter city name"
        className="border p-2 mr-3 mb-5 w-1/4"
        required
        pattern="[a-z]+"
      />
      <button className="bg-gray-200 p-2 mb-5" onClick={() => getData(city)}>
        データを取得
      </button>
      <h1>場所:{city}</h1>
      <p>天気:{data}</p>
      <p>気温:{temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      {/*取得したデータの表示*/}
    </div>
  );
}
