import { Component, OnInit } from '@angular/core';
import {FlightDetails} from '../flight-details';
import {FlightDetailService} from '../flight-detail.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-flight-details',
  templateUrl: './add-flight-details.component.html',
  styleUrls: ['./add-flight-details.component.css']
})
export class AddFlightDetailsComponent implements OnInit {
  flightDetails: FlightDetails;
  type;
  oldFlightNo;
  flightNos = [];

  constructor(private dialog: MatDialogRef<AddFlightDetailsComponent>,
              private flightDetailService: FlightDetailService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.type === 'add') {
      this.flightDetails = new FlightDetails();
    }
  }

  updateFlightDetails() {
    if (!this.checkIsFlightNoValid()) {
      this.flightDetailService.updateFlightDetails(this.flightDetails, this.type, this.oldFlightNo);
      this.toastr.success('Flight detail added !!!');
      this.close();
    } else {
      if (this.type === 'edit') {
        this.flightNos.push(this.oldFlightNo);
      }
      this.toastr.error('Flight exists...');
    }
  }

  checkIsFlightNoValid() {
    if (this.type === 'add') {
      return this.flightNos.includes(this.flightDetails.no);
    } else {
      const index = this.flightNos.indexOf(this.oldFlightNo);
      this.flightNos.splice(index, 1);
      return this.flightNos.includes(this.flightDetails.no);
    }
  }

  selectRoute(value, place) {
    console.log('Value : ', value);
  }

  close() {
    console.log('call aagudha...??? ');
    this.dialog.close();
  }

}
