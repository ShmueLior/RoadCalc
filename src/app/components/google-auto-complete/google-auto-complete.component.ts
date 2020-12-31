import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-google-auto-complete',
  templateUrl: './google-auto-complete.component.html',
  styleUrls: ['./google-auto-complete.component.css']
})
export class GoogleAutoCompleteComponent implements OnInit{
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressInput') private addressInput: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  dynamicPlaceHolder: string

  options = {
    types: [],
    componentRestrictions: { country: 'IL' }
    }

  constructor() {}
  ngOnInit() {}
  public AddressChange(address: any) {
      console.log(address);
  }

  public setPlaceHolder(placeholde: string){
    this.dynamicPlaceHolder = placeholde;
  }

  public resetInput(): void {
    const input = this.addressInput.nativeElement as HTMLInputElement;
    input.value = '';
}
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }


}
