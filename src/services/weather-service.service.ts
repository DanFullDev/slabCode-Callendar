import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient: HttpClient) { }

  //Must use your own API Key from OPENWeather
  private apiKey: any = "";

  getWeatherByCity(city:any)
  {
    return this.httpClient.get("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+this.apiKey, {
      observe: "body"
    })
  }

}
