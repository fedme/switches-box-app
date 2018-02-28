export class Participant {

  code: string;
  gender: string;
  age: number;
  ageGroup: string;
  dob: Date;
  grade: number;

  constructor(code: string) {
    this.code = code;
  }

  public equals(obj: Participant): boolean {
    return this.code === obj.code;
  }

}  