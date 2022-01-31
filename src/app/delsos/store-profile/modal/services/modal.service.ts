import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shopper } from 'app/delsos/model/Shopper';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  private apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  createDeliveryHistoryTable(table){
    
    let trackingHistory = JSON.parse(JSON.stringify(table));

    let trackingTable =[]

    const date = new Date(trackingHistory[0].date)
    trackingTable.push({
        date: date.toLocaleDateString("en-US",this.options),
        isOpen:false,
        locations : [{
            description:trackingHistory[0].description,
            location:trackingHistory[0].location,
            hour: date.toLocaleTimeString('en-US')
        }]
    })
    trackingHistory.shift()
    
    while (trackingHistory.length != 0 ){
        var l = trackingTable.length -1
        const sameDate = trackingHistory.filter(element => new Date(element.date).toLocaleDateString("en-US",this.options) == trackingTable[l].date)
        if(sameDate.length != 0)
        {
            for(let i in sameDate){
                const date = new Date(sameDate[i].date)
                trackingTable[l].locations.push({
                    description: sameDate[i].description,
                    location: sameDate[i].location,
                    hour: date.toLocaleTimeString('en-US')
                })
                trackingHistory.shift()
            }
        } else {
          const date = new Date(trackingHistory[0].date)
          trackingTable.push({
              date: date.toLocaleDateString("en-US",this.options),
              isOpen:false,
              locations : [{
                  description:trackingHistory[0].description,
                  location:trackingHistory[0].location,
                  hour: date.toLocaleTimeString('en-US')
              }]
          })
          trackingHistory.shift()
        }
    }

    return trackingTable
  }

  getShopper(id): Observable<Shopper> {
    return this.http.get<Shopper>(`${this.apiServerUrl}/shopper/${id}`);   
  }

  chooseShopper(deliveryId,shopperEmail): Observable<any> {
    return this.http.patch<any>(`${this.apiServerUrl}/delivery/affect-shopper`,{deliveryId,shopperEmail});   
  }
}
