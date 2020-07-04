export class Contact {
  public isBeenEdited: boolean = false;
  public addingNewPhone: boolean = false;
  public isInvalid: boolean = false;
  public timestamp: number;
  public name: string;
  public phones: string[];

  constructor(timestamp: number, name: string, phones: string[]) {
    this.timestamp = timestamp;
    this.name = name;
    this.phones = phones;
  }

  get creationDate() {
    return new Date(this.timestamp).toLocaleString()
  }
}