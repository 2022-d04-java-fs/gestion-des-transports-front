import { AddressService } from './../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { Features } from 'src/app/models/address-models/features';
import { CarpoolService } from 'src/app/services/carpool.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    private formB: FormBuilder,
    private addressService: AddressService,
    private carpoolService: CarpoolService
  ) {
    this.colForm = this.formB.group({
      departureAddress: [
        '',
        [Validators.required, this.validatorDepartureAddress.bind(this)],
      ],
      arrivalAddress: ['', [this.validatorArrivalAddress.bind(this)]],
      dp: ['', []],
    });
  }

  ngOnInit(): void {}

  /**
   * Envoi de la valeur de l'input 'departureAddress' au service pour effectuer
   * une requête : Récupérer tous les carpools correspondants
   */
  getInputDepartureAddress() {
    this.carpoolService.sendData(
      this.carpoolService.getDepartureSubject(),
      this.colForm.get('departureAddress')?.value
    );
  }

  /**
   * Envoi de la valeur de l'input 'arrivalAddress' au service pour trier les carpools
   */
  getInputArrivalAddress() {
    const inputArrivalAddress = this.colForm.get('arrivalAddress')?.value;

    if (inputArrivalAddress.length === 0) {
      this.getInputDepartureAddress();
    }

    this.carpoolService.sendData(
      this.carpoolService.getArrivalSubject(),
      inputArrivalAddress
    );
  }

  transform(value: NgbDateStruct): string {
    let day = value.day.toString();
    let month = value.month.toString();
    let year = value.year.toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    if (month.length === 1) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }

  /**
   * Envoi de la valeur de l'input 'dp' au service pour trier les carpools
   */
  getInputDate() {
    if (!this.colForm.get('dp')?.value) {
      this.getInputDepartureAddress();
    } else {
      let date = this.transform(this.colForm.get('dp')?.value);
      this.carpoolService.sendData(this.carpoolService.getDateSubject(), date);
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
   *  Validator : vérifie que l'adresse de départ saisie est connue de L'API api-adresse.data.gouv.fr/search/
   */
  validatorDepartureAddress(control: FormControl): ValidationErrors | null {
    if (control.pristine || !control.value) {
      return null;
    }
    if (
      !this.departureAddressList
        .map((e) => e.properties.label)
        .includes(control.value)
    ) {
      return { address: 'addresse inconnue' };
    }
    return null;
  }

  /**
   *  Validator : vérifie que l'adresse d'arrivée saisie est connue de L'API api-adresse.data.gouv.fr/search/
   */
  validatorArrivalAddress(control: FormControl): ValidationErrors | null {
    if (control.pristine || !control.value) {
      return null;
    }
    if (
      !this.arrivalAddressList
        .map((e) => e.properties.label)
        .includes(control.value)
    ) {
      return { address: 'addresse inconnue' };
    }
    return null;
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
    if (coord1 !== undefined && coord2 !== undefined) {
      this.addressService
        .getDistanceTime(coord1[0], coord1[1], coord2[0], coord2[1])
        .subscribe((distanceTime) => {
          this.distance = (distanceTime.total_distance / 1000) | 1;
          this.time = distanceTime.total_time;
        });
    }
  }
}
