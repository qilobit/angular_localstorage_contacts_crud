import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ImportService } from 'src/app/services/import.service';

declare var $: any;

@Component({
  selector: 'import-contacts-btn',
  templateUrl: './import-contacts-btn.component.html',
  styleUrls: ['./import-contacts-btn.component.scss']
})
export class ImportContactsBtnComponent implements OnInit {
  private readonly VALID_FILE = 'application/json';
  private readonly MODAL_ID = '#preview-modal';
  _file: FormControl = new FormControl(null)
  previewContacts: Contact[] = [];
  @Output() contactsImported: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly contactService: ContactService,
    private readonly importService: ImportService
  ) { }

  ngOnInit(): void {
  }

  async validateFile(event: any): Promise<void> {
    console.log('validateFile');
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file.type === this.VALID_FILE && file.size <= 2000000) {
        try {
          const contactsString = await this.importService.readFileAsString(file);
          this.loadContactsFromJson(contactsString);
        } catch (error) {
          alert('error al leer archivo');
        }
      } else {
        this._file.setValue(null);
        alert('Archivo invalido, Solo se admite .json con tamaño máximo de 2mg');
      }
    } else {
      console.log('No file');
    }
  }

  loadContactsFromJson(jsonString: string) {
    try {
      const contacts: Contact[] = JSON.parse(jsonString);
      contacts.forEach(con => {
        con.timestamp = new Date().getTime();
        const phonesAreValid = con.phones.filter(p => Number.isNaN(Number(p))).length === 0;
        if (this.contactService.contactNameExists(con.name) || !phonesAreValid) {
          con.isInvalid = true;
        }
      });
      this.previewContacts = contacts;
      $(this.MODAL_ID).modal({
        keyboard: false,
        backdrop: false
      });
    } catch (e) {
      alert('Error al cargar contactos, verifique el formato y intentelo de nuevo');
      console.log(e);
    }
  }

  saveContacts(): void {
    this.previewContacts.forEach(contact => {
      if (!contact.isInvalid) {
        this.contactService.saveContact(contact);
      }
    });
    this.contactsImported.emit(true);
    this.closeModal();
  }

  closeModal(): void {
    this._file.setValue('');
    this.previewContacts = [];
    $(this.MODAL_ID).modal('hide');
  }

}
