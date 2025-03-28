import { useState, useEffect } from "react";
import styles from './App.module.scss';
const App = () => {
  const [city, setCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('Одеса');

  const key = 'a297fd66dca3f11fad5615916c2dd17c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`;

  useEffect(() => {
    if (!cityName) return;

    setLoading(true);
    setError('');
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCity(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  }, [cityName]);

  const date = new Date().toLocaleDateString('en-En', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const cityEnterHandle = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setCityName(e.target.value.trim());
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <input type="text" onKeyDown={cityEnterHandle} placeholder="Enter city..."  />
        </header>
        <main className={styles.main}>
          <section className={styles.weather}>
            <header className={styles.weather__header}>
              <h1 className={styles.title}>{cityName}</h1>
              <img
                  src={`http://openweathermap.org/img/wn/${city.weather[0]?.icon}@2x.png`}
                  alt="Weather icon"/>
            </header>
            <article className={styles.weather__body}>
              <h2>{city.main?.temp.toFixed(0)}°C</h2>
              <p>{city.weather[0]?.description}</p>
              <p>{date}</p>
            </article>
          </section>
          <aside className={styles.details}>
            <h2>Weather details</h2>
            <ul>
              <li>Feels like: {city.main?.feels_like.toFixed(0)}°C</li>
              <li>Humidity: {city.main?.humidity}%</li>
              <li>Wind: {city.wind?.speed} m/s</li>
              <li>Pressure: {city.main?.pressure}</li>
            </ul>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default App
