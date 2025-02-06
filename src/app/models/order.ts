export interface Order {
    id: number;
    parentId: number;
    number: string;
    orderKey: string;
    createdVia: string;
    version: string;
    status: string;
    currency: string;
    dateCreated: string;
    dateCreatedGmt: string;
    dateModified: string;
    dateModifiedGmt: string;
    discountTotal: number;
    discountTax: number;
    shippingTotal: number;
    shippingTax: number;
    cartTax: number;
    total: number;
    totalTax: number;
    pricesIncludeTax: boolean;
    customerId: number;
    customerIpAddress: string;
    customerUserAgent: string;
    customerNote: string;
    billing: Billing;
    shipping: Shipping;
    paymentMethod: string;
    paymentMethodTitle: string;
    transactionId: string;
    datePaid: string;
    datePaidGmt: string;
    dateCompleted: string;
    dateCompletedGmt: string;
    cartHash: string;
    metaData: MetaData[];
    lineItems: LineItem[];
    taxLines: TaxLine[];
    shippingLines: ShippingLine[];
  }
  
  export interface Billing {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  }
  
  export interface Shipping {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  }
  
  export interface MetaData {
    id: number;
    key: string;
    value: string;
  }
  
  export interface LineItem {
    id: number;
    name: string;
    productId: number;
    variationId: number;
    quantity: number;
    taxClass: string;
    subtotal: number;
    subtotalTax: number;
    total: number;
    totalTax: number;
    taxes: Tax[];
    sku: string;
    price: number;
  }
  
  export interface Tax {
    id: number;
    total: number;
    subtotal: number;
  }
  
  export interface TaxLine {
    id: number;
    rateCode: string;
    rateId: number;
    label: string;
    compound: boolean;
    taxTotal: number;
    shippingTaxTotal: number;
    metaData: MetaData[];
  }
  
  export interface ShippingLine {
    id: number;
    methodTitle: string;
    methodId: string;
    total: number;
    totalTax: number;
    taxes: Tax[];
    metaData: MetaData[];
  }