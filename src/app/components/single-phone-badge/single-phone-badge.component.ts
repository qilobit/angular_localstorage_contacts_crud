import { Component, OnInit, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'single-phone-badge',
  templateUrl: './single-phone-badge.component.html',
  styleUrls: ['./single-phone-badge.component.scss']
})
export class SinglePhoneBadgeComponent implements OnInit {

  @Input() contact: Contact;
  @Input() phone: string;
  @Output() phoneAffected: EventEmitter<boolean> = new EventEmitter();
  editing: boolean = false;
  updatedPhone: FormControl = new FormControl('');

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  cancelEdition() {
    this.editing = false;
  }

  update() {
    if (this.updatedPhone.valid) {
      this.contactService.updatePhone(
        this.contact.name,
        this.phone,
        this.updatedPhone.value
      );
      this.updatedPhone.setValue('');
      this.cancelEdition();
      this.emitPhoneAffected();
    }
  }

  edit(): void {
    this.editing = true;
    this.updatedPhone.setValue(this.phone);
  }

  delete(): void {
    if (confirm('Estas seguro?')) {
      this.contactService.deletePhone(this.contact.name, this.phone);
      this.emitPhoneAffected();
    }
  }

  emitPhoneAffected(): void {
    this.phoneAffected.emit(true);
  }

}
