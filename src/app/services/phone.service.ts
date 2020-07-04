import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor() { }

  replaceNonNumbers(value: string): number {
    console.log('replaceNonNumbers ', value);
    return Number.parseInt(value.replace(/\D/gi, ''));
  }
}
