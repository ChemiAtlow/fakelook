class GuidFlavour<T> {
  _type?: T;
}
//eslint-disable-next-line @typescript-eslint/naming-convention
export type guid = GuidFlavour<"guid"> & string;

export class Guid {
  static empty: guid = "00000000-0000-0000-0000-000000000000";
  static isEmpty(val: guid) {
    return val === this.empty;
  }
  static isValid(val: guid | string): val is guid {
    return this.validator.test(val);
  }
  static new(): guid {
    return [
      this.segmentGenerator(2),
      this.segmentGenerator(1),
      this.segmentGenerator(1),
      this.segmentGenerator(1),
      this.segmentGenerator(3),
    ].join("-");
  }

  private static validator = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  private static segmentGenerator(count: 1 | 2 | 3) {
    let res = "";
    for (let index = 0; index < count; index++) {
      res += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return res;
  }
}
