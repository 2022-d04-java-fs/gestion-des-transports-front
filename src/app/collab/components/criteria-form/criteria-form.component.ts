import { AddressService } from './../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
  Subject,
} from 'rxjs';
import { Features } from 'src/app/models/address-models/features';
import { Carpool } from 'src/app/models/carpool';
import { CarpoolService } from 'src/app/services/carpool.service';
import { CarpoolsByService } from 'src/app/services/carpools-by.service';

@Component({
  selector: 'app-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.scss'],
})
export class CriteriaFormComponent implements OnInit {
  colForm: FormGroup;
  departureAddressList: Features[] = [];
  arrivalAddressList: Features[] = [];
  distance: number = 0;
  time: number = 0;
  departureAddress: string = '';

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private carpoolByService: CarpoolsByService
  ) {
    this.colForm = fb.group({
      departureAddress: ['', [Validators.required]],
      arrivalAddress: ['', []],
      dp: ['', []],
    });
  }

  ngOnInit(): void {}

  sendInput() {
    this.departureAddress = this.colForm.get('departureAddress')?.value;
    console.log('1');
    console.log('criteria-form.component.ts >> ', this.departureAddress);
    if (this.departureAddress.length > 0) {
      console.log('2');
      this.carpoolByService.sendData(this.departureAddress);
    }
  }

  /**
   * fonction d'autocomplétion pour l'adresse de départ
   */
  researchDepartureAddress: OperatorFunction<string, readonly string[]> = (
    text$: Observable<String>
  ) => {
    return text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term: any) =>
        term.length < 2
          ? []
          : this.departureAddressList.map((f) => f.properties.label)
      )
    );
  };

  /**
   * fonction d'autocomplétion pour l'adresse d'arrivée
   */
  researchArrivalAddress: OperatorFunction<string, readonly string[]> = (
    text$: Observable<String>
  ) => {
    return text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term: any) =>
        term.length < 2
          ? []
          : this.arrivalAddressList.map((f) => f.properties.label)
      )
    );
  };

  /**
   * Mise à jour de la liste d'addresse de départ grâce à l'API api-adresse.data.gouv.fr/
   */
  refreshDeparture() {
    this.addressService
      .getListAddresses(this.colForm.get('departureAddress')?.value)
      .subscribe((addresses) => {
        this.departureAddressList = [];
        return addresses.features.forEach((element) => {
          this.departureAddressList.push(element);
        });
      });
  }

  /**
   * Mise à jour de la liste d'addresse d'arrivée grâce à l'API api-adresse.data.gouv.fr/search/
   */
  refreshArrival() {
    this.addressService
      .getListAddresses(this.colForm.get('arrivalAddress')?.value)
      .subscribe((addresses) => {
        this.arrivalAddressList = [];
        return addresses.features.forEach((element) => {
          this.arrivalAddressList.push(element);
        });
      });
  }

  /**
   * Calcul de la distance et de la durée de trajet grâce à l'API aps.open-street.com/api/route
   */
  estimateDistanceTime() {
    let coord1 = this.departureAddressList
      .filter(
        (e) =>
          e.properties.label === this.colForm.get('departureAddress')?.value
      )
      .map((e) => e.geometry.coordinates)[0];
    let coord2 = this.arrivalAddressList
      .filter(
        (e) => e.properties.label === this.colForm.get('arrivalAddress')?.value
      )
      .map((e) => e.geometry.coordinates)[0];
    this.addressService
      .getDistanceTime(coord1[0], coord1[1], coord2[0], coord2[1])
      .subscribe((distanceTime) => {
        this.distance = (distanceTime.total_distance / 1000) | 1;
        this.time = distanceTime.total_time;
      });
  }
}
