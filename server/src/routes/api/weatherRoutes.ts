
import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  console.log('back-end cityName', cityName);
  if(req.body) {
    //than set city property value
    WeatherService.set(cityName);
    weatherService.logCity();

    /*
[
    {
        "name": "Queens County",
        "local_names": {
            "en": "Queens County",
            "ru": "округ Куинс"
        },
        "lat": 40.7135078,
        "lon": -73.8283132,
        "country": "US",
        "state": "New York"
    }
]
    */
    const coordinates = await WeatherService.getCoodinates();
    console.log('coordinates', coordinates[0].lat, coordinates[0].lon);

    //coordinates[0].lat, coordinates[0].lon
    const data = await WeatherService.getData(coordinates[0].lat, coordinates[0].lon);
    
    
    res.json(data);


    //respon api call
    //res.json({"cityName": cityName});

    //than call method to make request to geo->get city (lat, lon)

    //than call methods to make request to weather forecast

  }else {
      res.send('request error!');
  }
      
  // TODO: save city to search history

  //than repond to frontend with data
});


// TODO: GET search history
//router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;

