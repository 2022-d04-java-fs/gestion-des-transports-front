import { DistanceTime } from './../../../models/address-models/distance-time';
import { Features } from './../../../models/address-models/features';
import { AddressService } from './../../../services/address.service';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  formOffer: FormGroup
  departureAddressList: Features[] = []
  arrivalAddressList: Features[] = []
  distance = 0
  time = 0

  constructor(private fb: FormBuilder, private modalService: NgbModal, private addressServ: AddressService) {
    this.formOffer = fb.group({
      departureAddress: ['', [Validators.required, this.validatorDepartureAddress.bind(this)]],
      arrivalAddress: ['', [Validators.required, this.validatorArrivalAddress.bind(this)]],
      licensePlate: ['', {validators:[Validators.required, Validators.pattern('^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$')], updateOn: "blur" }],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      availableSeats: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      date: ['', [Validators.required]],
      hour: [null, [Validators.required]],
      minutes: [null, [Validators.required]]
    }, { validators: [this.validatorDAAddress, this.validatorDate.bind(this)]})
  }


  researchDepartureAddress: OperatorFunction<string, readonly string[]> = (text$: Observable<String>) => {
    return text$.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.departureAddressList.map(f => f.properties.label)))
  }

  researchArrivalAddress: OperatorFunction<string, readonly string[]> = (text$: Observable<String>) => {
    return text$.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.arrivalAddressList.map(f => f.properties.label)))
  }


  refreshDeparture() {
    this.departureAddressList = []
    this.addressServ.getListAddresses(this.formOffer.get('departureAddress')?.value)
      .subscribe(addresses => addresses.features.forEach(element => {
        this.departureAddressList.push(element)
      }));
  }

  refreshArrival() {
    this.arrivalAddressList = []
    this.addressServ.getListAddresses(this.formOffer.get('arrivalAddress')?.value)
      .subscribe(addresses => addresses.features.forEach(element => {
        this.arrivalAddressList.push(element)
      }));
  }

  estimateDistanceTime() {
    try{
      let coord1 = this.departureAddressList.filter(e => e.properties.label === this.formOffer.get('departureAddress')?.value).map(e => e.geometry.coordinates)[0]
      let coord2 = this.arrivalAddressList.filter(e => e.properties.label === this.formOffer.get('arrivalAddress')?.value).map(e => e.geometry.coordinates)[0]
      this.addressServ.getDistanceTime(coord1[0], coord1[1], coord2[0], coord2[1]).subscribe(distanceTime => {
        this.distance = distanceTime.total_distance/1000|1;
        this.time = distanceTime.total_time;
      })
    }
    catch{}
  }

  validatorDAAddress(control: AbstractControl): ValidationErrors | null {
    if (control.get("departureAddress")?.pristine || control.get("arrivalAddress")?.pristine || control.get("departureAddress")?.value === "" || control.get("arrivalAddress")?.value === "") {
      return null
    }
    const departure = control.get("departureAddress")?.value
    const arrival = control.get("arrivalAddress")?.value
    if (departure === arrival) {
      return { daaddress: "l'addresse de départ et d'arrivée doivent être différentes" }
    }
    return null
  }

  validatorDate(control: AbstractControl): ValidationErrors | null {
    if (control.get("date")?.pristine || control.get("hour")?.pristine || control.get("minutes")?.pristine) {
      return null
    }
    const date = this.dateTransform(control.get("date")?.value, control.get("hour")?.value, control.get("minutes")?.value)
    const currentDate = new Date()
    if (date < currentDate) {
      return { date: "la date saisie doit être posterieure à la date actuelle" }
    }
    return null
  }


  validatorDepartureAddress(control: FormControl): ValidationErrors | null {
    if (control.pristine) {
      return null
    }
    if (!(this.departureAddressList.map(e => e.properties.label).includes(control.value))) {
      return { address: "addresse inconnue" }
    }
    return null
  }


  validatorArrivalAddress(control: FormControl): ValidationErrors | null {
    if (control.pristine) {
      return null
    }
    if (!(this.arrivalAddressList.map(e => e.properties.label).includes(control.value))) {
      return { address: "addresse inconnue" }
    }
    return null
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  dateTransform(date: NgbDateStruct, hour: number, minutes: number): Date {
    return new Date(date.year, date.month - 1, date.day, hour, minutes, 0);
  }

  validate() {
    alert("coucou")
    this.formOffer.reset()
  }

  ngOnInit(): void {
  }

  checkRequired(param: String) {
    return this.formOffer.controls[param.toString()].dirty && this.formOffer.controls[param.toString()].hasError('required')
  }

  checkLicense() {
    return this.formOffer.controls['licensePlate'].hasError('pattern') && this.formOffer.get('licensePlate')?.value != ""
  }

  checkDateTime() {
    const dateBool = this.formOffer.controls['date'].hasError('required') && this.formOffer.controls['date'].touched
    const hourBool = this.formOffer.controls['hour'].hasError('required') && this.formOffer.controls['date'].touched
    const minuteBool = this.formOffer.controls['minutes'].hasError('required') && this.formOffer.controls['date'].touched
    return dateBool || hourBool || minuteBool
  }

}
