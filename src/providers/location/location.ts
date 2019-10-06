import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationProvider {

  private GOOGLE_API_KEY = "AIzaSyD0AOG1rYumCyBfOUpOI3j2yGOMk7qe904";

  constructor(public http: HttpClient) {

  }

  //performs a HTTP-call to the Geocode API, by sending in latitude and longitude, as well as the API key.
  getAddressBasedOnLatLng(lat: number, lng: number): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${this.GOOGLE_API_KEY}`)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        )
    });
  }


}