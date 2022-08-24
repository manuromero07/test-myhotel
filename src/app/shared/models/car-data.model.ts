export class CarModel {
  /**
   * car identifier
   */
  id?: string;
  /**
   * creation date
   */
  date?: Date;
  /**
   * Car brand
   */
  brand: string;
  /**
   * Car model
   */
  model: string;
  /**
   * Car color
   */
  color: string;
  /**
   * Car image
   */
  image?: string;
  /**
   * Car price
   */
  patent: string;
  /**
   * Car price
   */
  price: number;

  constructor(
    brand: string,
    model: string,
    patent: string,
    color: string,
    price: number,
    image?: string,
    id?: string,
    date?: Date
  ) {
    this.brand = brand;
    this.model = model;
    this.patent = patent;
    this.color = color;
    this.id = id;
    this.date = date;
    this.image = image;
    this.price = price;
  }
}
