import { useState, useEffect } from "react";
import styles from './App.module.scss';


const App = () => {

  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState(null);
  const [error, setError] = useState('');

  const key = 'a297fd66dca3f11fad5615916c2dd17c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

  const cityEnterHandler = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setCityName(e.target.value.trim());
      e.target.value = '';
    }
  }

  const date = new Date().toLocaleDateString('en-En', { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    if (!cityName) return;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => setError(data));
        } else return response.json();
      })
      .then(data => {
        setError('');
        setCity(data);
      })
    .catch(error => setError(error));
  }, [cityName]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <input type="text" placeholder="Enter city..." onKeyDown={cityEnterHandler} />
            {error && 
              <>
                <p className={styles.error}>{error.message}</p>
              </>
            }
          </header>
          {city && 
            <>
            <main className={styles.main}>
              <section className={styles.weather}>
                <header className={styles.weather__header}>
                  <h1 className={styles.title}>{city.name}</h1>
                  <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt={`${city.weather[0].description} icon`} />
                </header>
                <article className={styles.weather__body}>
                  <h2>{city.main.temp.toFixed(0)}°C</h2>
                  <p>{city.weather[0].description}</p>
                  <p>{date}</p>
                </article>
              </section>
              <section className={styles.details}>
                <h2>Wether details</h2>
                <ul>
                  <li>Feels like: {city.main.feels_like.toFixed(0)}°C</li>
                  <li>Humidity: {city.main.humidity}%</li>
                  <li>Wind: {city.wind.speed} m/s</li>
                  <li>Pressure: {city.main.pressure}</li>
                </ul>
              </section>
            </main>
            </>
          }
        </div>
      </div>
      
    </>
  )
}

export default App


