import { AuthService } from 'src/app/services/auth.service';
import { CarpoolService } from './../../../services/carpool.service';
import { AddCarpool } from './../../../models/carpool';
import { Features } from './../../../models/address-models/features';
import { AddressService } from './../../../services/address.service';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PrivateVehicle } from 'src/app/models/private-vehicle';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  minutesList!: number[];
  hoursList!: number[];

  formOffer: FormGroup;
  departureAddressList: Features[] = [];
  arrivalAddressList: Features[] = [];
  distance = 0;
  time = 0;
  date!: Date;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private addressServ: AddressService,
    private carpoolServ: CarpoolService,
    private authSrv: AuthService,
    private toastSrv: ToastService
  ) {
    this.minutesList = Array(6)
      .fill(1)
      .map((x, i) => x * i * 10);
    this.hoursList = Array(24)
      .fill(1)
      .map((x, i) => x * i);
    this.formOffer = fb.group(
      {
        departureAddress: [
          '',
          [Validators.required, this.validatorDepartureAddress.bind(this)],
        ],
        arrivalAddress: [
          '',
          [Validators.required, this.validatorArrivalAddress.bind(this)],
        ],
        licensePlate: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern('^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$'),
            ],
            updateOn: 'blur',
          },
        ],
        brand: ['', { validators: [Validators.required], updateOn: 'blur' }],
        model: ['', { validators: [Validators.required], updateOn: 'blur' }],
        availableSeats: [
          '',
          {
            validators: [
              Validators.required,
              Validators.min(1),
              Validators.max(20),
            ],
            updateOn: 'blur',
          },
        ],
        date: ['', { validators: [Validators.required], updateOn: 'blur' }],
        hour: [null, { validators: [Validators.required], updateOn: 'blur' }],
        minutes: [
          null,
          { validators: [Validators.required], updateOn: 'blur' },
        ],
      },
      { validators: [this.validatorDAAddress, this.validatorDate.bind(this)] }
    );
  }

  /**
   * fonction d'autocomplétion pour l'adresse de départ
   */
  researchDepartureAddress: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    return text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
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
      map((term) =>
        term.length < 2
          ? []
          : this.arrivalAddressList.map((f) => f.properties.label)
      )
    );
  };

  /**
   * Mise à joue de la liste d'addresse de départ grâce à l'API api-adresse.data.gouv.fr/
   */
  refreshDeparture() {
    this.addressServ
      .getListAddresses(this.formOffer.get('departureAddress')?.value)
      .subscribe((addresses) => {
        this.departureAddressList = [];
        return addresses.features.forEach((element) => {
          this.departureAddressList.push(element);
        });
      });
  }

  /**
   * Mise à joue de la liste d'addresse d'arrivée grâce à l'API api-adresse.data.gouv.fr/search/
   */
  refreshArrival() {
    this.arrivalAddressList = [];
    this.addressServ
      .getListAddresses(this.formOffer.get('arrivalAddress')?.value)
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
          e.properties.label === this.formOffer.get('departureAddress')?.value
      )
      .map((e) => e.geometry.coordinates)[0];
    let coord2 = this.arrivalAddressList
      .filter(
        (e) =>
          e.properties.label === this.formOffer.get('arrivalAddress')?.value
      )
      .map((e) => e.geometry.coordinates)[0];
    if (coord1 != undefined && coord2 != undefined) {
      this.addressServ
        .getDistanceTime(coord1[0], coord1[1], coord2[0], coord2[1])
        .subscribe((distanceTime) => {
          this.distance = distanceTime.total_distance;
          this.time = distanceTime.total_time;
        });
    }
  }

  /**
   * Validator : vérifie que l'adresse de départ et d'arrivée sont différentes
   */
  validatorDAAddress(control: AbstractControl): ValidationErrors | null {
    if (
      control.get('departureAddress')?.pristine ||
      control.get('arrivalAddress')?.pristine ||
      control.get('departureAddress')?.value === '' ||
      control.get('arrivalAddress')?.value === ''
    ) {
      return null;
    }
    const departure = control.get('departureAddress')?.value;
    const arrival = control.get('arrivalAddress')?.value;
    if (departure === arrival) {
      return {
        daaddress: "l'addresse de départ et d'arrivée doivent être différentes",
      };
    }
    return null;
  }

  /**
   * Validator : vérifie que la date saisie est posterieure à la date en cour
   */
  validatorDate(control: AbstractControl): ValidationErrors | null {
    if (
      control.get('date')?.pristine ||
      control.get('hour')?.pristine ||
      control.get('minutes')?.pristine
    ) {
      return null;
    }
    const date = this.dateTransform(
      control.get('date')?.value,
      control.get('hour')?.value,
      control.get('minutes')?.value
    );
    const currentDate = new Date();
    if (date < currentDate) {
      return {
        date: 'la date saisie doit être posterieure à la date actuelle',
      };
    }
    return null;
  }

  /**
   *  Validator : vérifie que l'adresse de départ saisie est connue de L'API api-adresse.data.gouv.fr/search/
   */
  validatorDepartureAddress(control: FormControl): ValidationErrors | null {
    if (control.pristine) {
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
    if (control.pristine) {
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
   * ouvre la fenêtre modale
   */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  /**
   * convertit et fusionne les différents paramètres temporels en un objet TS Date
   */
  dateTransform(date: NgbDateStruct, hour: number, minutes: number): Date {
    this.date = new Date(date.year, date.month - 1, date.day, hour, minutes, 0);
    return this.date;
  }

  /**
   * Valide le formulaire
   */
  validate() {
    let privateVehicle: PrivateVehicle = {
      licensePlate: this.formOffer.get('licensePlate')?.value,
      brand: this.formOffer.get('brand')?.value,
      model: this.formOffer.get('model')?.value,
    };
    let carpool: AddCarpool = {
      creatorId: this.authSrv.getUserId(),
      departureAddress: this.formOffer.get('departureAddress')?.value,
      arrivalAddress: this.formOffer.get('arrivalAddress')?.value,
      distance: this.distance,
      duration: this.time,
      vehicle: privateVehicle,
      availableSeats: this.formOffer.get('availableSeats')?.value,
      date: this.formatDate(this.date),
    };

    this.carpoolServ.addCarpool(carpool).subscribe(() => this.showSuccess());
    this.distance = 0;
    this.time = 0;
    this.formOffer.reset();
  }

  showSuccess() {
    this.toastSrv.show('Annonce publiée !', {
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
      headertext: 'Félicitations',
    });
  }

  ngOnInit(): void {}

  /**
   * Vérifie que le validator Required est bien respecté pour un paramètre donné
   */
  checkRequired(param: String) {
    return (
      this.formOffer.controls[param.toString()].dirty &&
      this.formOffer.controls[param.toString()].hasError('required')
    );
  }

  /**
   * Vérifie que le validator Pattern du paramètre licensePlate est bien respecté
   */
  checkLicense() {
    return (
      this.formOffer.controls['licensePlate'].hasError('pattern') &&
      this.formOffer.get('licensePlate')?.value != ''
    );
  }

  checkDateTime() {
    const dateBool =
      this.formOffer.controls['date'].hasError('required') &&
      this.formOffer.controls['date'].touched;
    const hourBool =
      this.formOffer.controls['hour'].hasError('required') &&
      this.formOffer.controls['date'].touched;
    const minuteBool =
      this.formOffer.controls['minutes'].hasError('required') &&
      this.formOffer.controls['date'].touched;

    return dateBool || hourBool || minuteBool;
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
      ].join('-') +
      ' ' +
      [
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0'),
        date.getSeconds().toString().padStart(2, '0'),
      ].join(':')
    );
  }
}
