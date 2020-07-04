import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor() { }

  readFileAsString(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (result) => {
          resolve(result.target.result.toString());
        };
        reader.readAsText(file);
      } catch (error) {
        reject(error);
      }
    });
  }

}
