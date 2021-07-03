export interface IProductData {
    id?: number;
    name?: string;
    type?: string;
    description?: string;
    price?: number;
}

export class ProductData implements IProductData {
    constructor(
        public id?: number,
        public name?: string,
        public type?: string,
        public description?: string,
        public price?: number
    ){}
}