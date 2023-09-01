import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(private fb: FormBuilder) {

  }
  bookingForm!: FormGroup;

  ngOnInit(): void {
    this.createBookingForm();
  }

  addInfo(): void {
    this.getInfoArray().push(this.getInfoFormFields());
  }

  getInfoArray(): FormArray {
    return this.bookingForm.get('visitorInfo') as FormArray;
  }

  getInfoAddressArray(index: number): FormArray {
    return this.getInfoArray().at(index).get('info') as FormArray;
  }

  addVisitorInfo(index: number) {
    this.getInfoAddressArray(index).push(this.getAddressInfoField());
  }

  submit(): void {
    console.log(this.bookingForm.value);
  }

  private createBookingForm(): void {
    this.bookingForm = this.fb.group({
      temple: ['', Validators.required],
      timeSlot: ['', Validators.required],
      visitorInfo: this.fb.array([])
    })
  }

  private getInfoFormFields(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      info: this.fb.array([])
    })
  }

  private getAddressInfoField(): FormGroup {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required]
    })
  }

}
