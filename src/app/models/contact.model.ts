export class Contact {
  public isBeenEdited: boolean = false;
  public addingNewPhone: boolean = false;
  public isInvalid: boolean = false;
  constructor(public id: number, public name: string, public phones: string[]) {

  }

}