import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

declare var $: any;

@Component({
  selector: 'add-contact-btn',
  templateUrl: './add-contact-btn.component.html',
  styleUrls: ['./add-contact-btn.component.scss']
})
export class AddContactBtnComponent implements OnInit {
  private readonly modalId = '#contact-modal';
  @Output() newContactAdded: EventEmitter<boolean> = new EventEmitter();
  name = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.pattern('[0-9]*'));

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.name.setValue('');
    this.phone.setValue('');
    this.name.reset();
    this.phone.reset();
    $(this.modalId).modal('hide');
  }

  save() {
    if (this.name.value != '' && this.phone.value != '') {
      const contact = new Contact(
        new Date().getTime(),
        this.name.value,
        [this.phone.value]
      );
      this.contactService.saveContact(contact);
      alert('Contacto creado');
      this.newContactAdded.emit(true);
      this.closeModal();
    }
  }

  openModal() {
    $(this.modalId).modal('show');
  }
}
