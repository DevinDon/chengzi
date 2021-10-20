export class BaseValidation<T> {

  public readonly value: unknown = this.input;

  constructor(protected readonly input: T) { }

}

export class NumberValidation<T> extends BaseValidation<T> {

  public readonly value: number;

  constructor(input: T) {
    super(input);
    switch (typeof input) {
      case 'string':
        this.value = +input;
        break;
      case 'number':
        this.value = input;
        break;
      default:
        this.value = NaN;
        break;
    }
  }

  public isExisted(): boolean {
    return this.input !== undefined && this.input !== null;
  }

  public isNotExisted(): boolean {
    return !this.isExisted();
  }

  public isValid(): boolean {
    return !isNaN(this.value);
  }

  public isInvalid(): boolean {
    return !this.isValid();
  }

  public isLargerThan(min: number): boolean {
    return this.value > min;
  }

  public isNotLargerThan(min: number): boolean {
    return !this.isLargerThan(min);
  }

  public isLargerOrEqualThan(min: number): boolean {
    return this.value >= min;
  }

  public isNotLargerOrEqualThan(min: number): boolean {
    return !this.isLargerOrEqualThan(min);
  }

  public isSmallerThan(max: number): boolean {
    return this.value < max;
  }

  public isNotSmallerThan(max: number): boolean {
    return !this.isSmallerThan(max);
  }

  public isSmallerOrEqualThan(max: number): boolean {
    return this.value <= max;
  }

  public isNotSmallerOrEqualThan(max: number): boolean {
    return !this.isSmallerOrEqualThan(max);
  }

  public isBetween(min: number, max: number): boolean {
    return this.value > min && this.value < max;
  }

  public isNotBetween(min: number, max: number): boolean {
    return !this.isBetween(min, max);
  }

  public isInteger(): boolean {
    return Number.isInteger(this.value);
  }

  public isNotInteger(): boolean {
    return !this.isInteger();
  }

  public is(validate: (value: number) => boolean): boolean {
    return validate(this.value);
  }

}

export class BooleanValidation<T> extends BaseValidation<T> {

  public readonly value: boolean;

  constructor(
    input: T,
    validate: (input: T) => boolean = (input: T) => typeof input === 'string' ? input === 'true' : !!input,
  ) {
    super(input);
    this.value = validate(input);
  }

  public is(validate: (input: T) => boolean): boolean {
    return validate(this.input);
  }

}

export class StringValidation<T> extends BaseValidation<T> {

  public readonly value: string;

  constructor(input: T) {
    super(input);
    switch (typeof input) {
      case 'string':
        this.value = input;
        break;
      case 'bigint':
      case 'number':
      case 'boolean':
      case 'symbol':
      case 'function':
        this.value = input.toString();
        break;
      default:
        this.value = '';
        break;
    }
  }

  public isExisted(): boolean {
    return this.input !== undefined && this.input !== null;
  }

  public isNotExisted(): boolean {
    return !this.isExisted();
  }

  public isEquals(value: string): boolean {
    return this.value === value;
  }

  public isNotEquals(value: string): boolean {
    return !this.isEquals(value);
  }

  public is(validate: (input: string) => boolean): boolean {
    return validate(this.value);
  }

  public isNot(validate: (input: string) => boolean): boolean {
    return !this.is(validate);
  }

}
