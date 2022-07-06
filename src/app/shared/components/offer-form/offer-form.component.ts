import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  formOffer: FormGroup
  addressList = [
    'Gare de Lyon',
    'Gare Lille Flandres',
    'Gare Lille Europe',
    'Gare St Lazarre'
  ]


  constructor(private fb:FormBuilder, private modalService: NgbModal) {
    this.formOffer = fb.group({
      departureAddress:['', [Validators.required, this.validatorAddress.bind(this)]],
      arrivalAddress:['', [Validators.required, this.validatorAddress.bind(this)]],
      licensePlate:['', [Validators.required, Validators.pattern('^[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}$')]],
      brand:['', [Validators.required]],
      model:['', [Validators.required]],
      availableSeats:['', [Validators.required, Validators.min(1), Validators.max(20)]],
      date:['', [Validators.required]],
      hour:[null, [Validators.required]],
      minutes:[null, [Validators.required]]
    },{validators: [this.validatorDAAddress, this.validatorDate.bind(this)], updateOn: "blur"})
  }


  validatorDAAddress(control:AbstractControl):ValidationErrors | null{
    if (control.get("departureAddress")?.pristine || control.get("arrivalAddress")?.pristine || control.get("departureAddress")?.value ==="" || control.get("arrivalAddress")?.value === ""){
      return null
    }
    const departure = control.get("departureAddress")?.value
    const arrival = control.get("arrivalAddress")?.value
    if (departure === arrival){
      return {daaddress: "l'addresse de départ et d'arrivée doivent être différentes"}
    }
    return null
  }

  validatorDate(control:AbstractControl):ValidationErrors | null{
    if (control.get("date")?.pristine || control.get("hour")?.pristine || control.get("minutes")?.pristine){
      return null
    }
    const date = this.dateTransform(control.get("date")?.value, control.get("hour")?.value, control.get("minutes")?.value)
    const currentDate = new Date()
    if (date < currentDate){
      return {date : "la date saisie doit être posterieure à la date actuelle"}
    }
    return null
  }


  validatorAddress(control:FormControl):ValidationErrors | null{
    if(control.pristine){
      return null
    }
    if (!(this.addressList.includes(control.value))){
      return {address: "addresse inconnue"}
    }
    return null
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  dateTransform(date:NgbDateStruct, hour:number, minutes:number):Date{
    return new Date(date.year,date.month -1,date.day,hour,minutes,0);
  }

  validate(){
    alert("coucou")
    this.formOffer.reset()
  }

  ngOnInit(): void {
  }

  checkRequired(param:String){
    return this.formOffer.controls[param.toString()].dirty && this.formOffer.controls[param.toString()].hasError('required')
  }

  checkLicense(){
    return this.formOffer.controls['licensePlate'].hasError('pattern') && this.formOffer.get('licensePlate')?.value != ""
  }

  checkDateTime(){
    const dateBool = this.formOffer.controls['date'].hasError('required') && this.formOffer.controls['date'].touched
    const hourBool = this.formOffer.controls['hour'].hasError('required') && this.formOffer.controls['date'].touched
    const minuteBool = this.formOffer.controls['minutes'].hasError('required') && this.formOffer.controls['date'].touched
    return dateBool || hourBool || minuteBool
  }

}
