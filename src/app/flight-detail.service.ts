import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FlightDetails } from './flight-details';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailService {

  private dbPath = '/flight-details';

  flightDetailsRef: AngularFireList<FlightDetails> = null;

  constructor(private db: AngularFireDatabase) {
    this.flightDetailsRef = db.list(this.dbPath);
  }

  updateFlightDetails(flightDetails: FlightDetails, type: string, oldFlightNo: string): void {
    if (type === 'edit' && oldFlightNo) {
      const delItemRef = this.db.object(`flight-details/${oldFlightNo}`);
      delItemRef.remove();
    }
    const itemRef = this.db.object(`flight-details/${flightDetails.no}`);
    itemRef.update(flightDetails);
  }

  getFlightDetails(route) {
    return this.db.object(route).valueChanges();
  }

  deleteFlightDetail(route) {
    const itRef = this.db.object(route);
    itRef.remove();
  }

}
