export class Contact {
  public isBeenEdited: boolean = false;
  constructor(public id: number, public name: string, public phones: string[]) {

  }
}