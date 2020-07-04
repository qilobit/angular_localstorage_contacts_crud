export class Contact {
  public isBeenEdited: boolean = false;
  public addingNewPhone: boolean = false;
  public isInvalid: boolean = false;
  constructor(public timestamp: number, public name: string, public phones: string[]) {

  }

}