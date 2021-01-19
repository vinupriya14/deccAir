import { Component, OnInit } from '@angular/core';
import {FlightDetails} from './flight-details';
import {MatDialog} from '@angular/material/dialog';
import {AddFlightDetailsComponent} from './add-flight-details/add-flight-details.component';
import {FlightDetailService} from './flight-detail.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flightDetailList = [];
  flightNos = [];
  dataSource;
  displayedColumns = ['flightNo', 'fuelCapacity', 'route', 'origin', 'destination', 'time', 'duration', 'stopType', 'edit', 'delete'];

  constructor(private dialog: MatDialog,
              private flightDetailService: FlightDetailService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFlightDetails();
  }

  addFlightDetails() {
    const dialogRef = this.dialog.open(AddFlightDetailsComponent);
    dialogRef.componentInstance.type = 'add';
    dialogRef.componentInstance.flightNos = this.flightNos;
  }

  getFlightDetails() {
    this.flightDetailService.getFlightDetails('flight-details').subscribe(res => {
      this.flightDetailList = [];
      if (res) {
        Object.keys(res).map(key => {
          this.flightNos.push(key);
          this.flightDetailList.push(res[key]);
        });
        this.dataSource = this.flightDetailList;
      }
    });
  }
  deleteFlightDetail(flightNo) {
    this.flightDetailService.deleteFlightDetail(`flight-details/${flightNo}`);
    this.toastr.success('Flight detail deleted.');
  }
  editFlightDetail(flight) {
    flight = JSON.parse(JSON.stringify(flight));
    const dialogRef = this.dialog.open(AddFlightDetailsComponent);
    dialogRef.componentInstance.type = 'edit';
    dialogRef.componentInstance.flightDetails = flight;
    dialogRef.componentInstance.oldFlightNo = flight.no;
    dialogRef.componentInstance.flightNos = this.flightNos;
  }


}
