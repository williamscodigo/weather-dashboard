
import { Router, type Request, type Response } from 'express';
const router = Router();


import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
 
  if(req.body) {
    try {
      //than set city property value
    weatherService.set(cityName);

      //get coordinates - lat and lon
      const coordinates = await weatherService.getCoodinates();

      //get weather data
    const data = await weatherService.getData(coordinates[0].lat, coordinates[0].lon);

    //add city to history
    historyService.addCity(cityName);
    
    
    //respond with data 
    res.json(data);

    } catch (error) {
      if(error) {
        res.json(new Error("api error for given city name!"));
      }
    }

  }else {
      res.send('request error!');
  }
});


// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const cities = await historyService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'State id is required' });
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;

