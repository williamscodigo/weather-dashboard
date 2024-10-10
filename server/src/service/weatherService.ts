
import dotenv from 'dotenv';
dotenv.config();

/*
// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
*/

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDesc: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
  city: string,
  date: string,
  icon: string,
  iconDesc: string,
  tempF: number,
  windSpeed: number,
  humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDesc = iconDesc;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

//let weatherArray: Weather[] = [];


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  //private baseURL = `${process.env.API_BASE_URL}`;
  //private apiKey = `${process.env.API_KEY}`;
  protected cityName: string = '';
  
  //set method for cityName
  set(cityName: string) {
    this.cityName = cityName;
  }

  logCity() {
    console.log(this.cityName);
  }

  async getCoodinates() {

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${process.env.API_KEY}`;

    try {
      const response = await fetch(url);

      const coordinates = await response.json();

      return coordinates;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }

  }


  async getData(lat: number, lon: number) {
    //note: this might need to be define in global scope
    let weatherArray: Weather[] = [];
  
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`;

    try {
      const response = await fetch(url);

      const data = await response.json();

      const originalDataArray = data.list;

      //break into different days - time noon
      let dataArray: Weather[] = [];

      //push first weather obj into array
      dataArray.push(originalDataArray[0]);

      //search for noon temp - and only push the obj that match
      for(let i = 1; i < originalDataArray.length; i++){
        let iterationDate = originalDataArray[i].dt_txt;
        if(iterationDate.slice(-8) === '12:00:00') dataArray.push(originalDataArray[i]);
      }

  
      //loop array to create Weather obj to send to front-end
      dataArray.map((item: any) => {

        const date = new Date(item.dt_txt.slice(0, 10).replace(/-/g, "/"));
        const localeString = date.toLocaleDateString();
        console.log(localeString); 

        const weather = new Weather(
          this.cityName,
          localeString,
          item.weather[0].icon,
          item.weather[0].description,
          item.main.temp,
          item.wind.speed,
          item.main.humidity
        );
        weatherArray.push(weather);
      });

      //return data;
      return weatherArray;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }

  }


  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();

