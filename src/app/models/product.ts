export interface Product {
    id: number;
    name: string;
    slug: string;
    postAuthor: string;
    permalink: string;
    dateCreated: string; // Date as string to match the ISO format (alternatively, you can use `Date` type)
    dateCreatedGmt: string;
    dateModified: string;
    dateModifiedGmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalogVisibility: string;
    description: string;
    shortDescription: string;
    sku: string;
    price: number;
    regularPrice: number;
    salePrice: number | null;
    dateOnSaleFrom: string | null;
    dateOnSaleFromGmt: string | null;
    dateOnSaleTo: string | null;
    dateOnSaleToGmt: string | null;
    priceHtml: string;
    onSale: boolean;
    purchasable: boolean;
    totalSales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    downloadLimit: number;
    downloadExpiry: number;
    externalUrl: string;
    buttonText: string;
    taxStatus: string;
    taxClass: string;
    manageStock: boolean;
    stockQuantity: number | null;
    lowStockAmount: string;
    inStock: boolean;
    backorders: string;
    backordersAllowed: boolean;
    backordered: boolean;
    soldIndividually: boolean;
    weight: string;
    dimensions: Dimensions;
    shippingRequired: boolean;
    shippingTaxable: boolean;
    shippingClass: string;
    shippingClassId: number;
    reviewsAllowed: boolean;
    averageRating: string;
    ratingCount: number;
    relatedIds: number[];
    upsellIds: number[];
    crossSellIds: number[];
    parentId: number;
    purchaseNote: string;
    categories: Category[];
    tags: any[];
    images: Image[];
    attributes: any[];
    defaultAttributes: any[];
    variations: any[];
    groupedProducts: any[];
    menuOrder: number;
    metaData: MetaData[];
    store: Store;
    rowActions: RowActions;
    links: Links;
  }
  
  export interface Dimensions {
    length: string;
    width: string;
    height: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface Image {
    id: number;
    dateCreated: string;
    dateCreatedGmt: string;
    dateModified: string;
    dateModifiedGmt: string;
    src: string;
    name: string;
    alt: string;
    position: number;
    isFeatured: boolean;
  }
  
  export interface MetaData {
    id: number;
    key: string;
    value: any;
  }
  
  export interface Store {
    id: number;
    name: string;
    url: string;
    avatar: string;
    address: Address;
  }
  
  export interface Address {
    street1: string;
    street2: string;
    city: string;
    zip: string;
    country: string;
    state: string;
  }
  
  export interface RowActions {
    edit: Action;
    delete: Action;
    view: Action;
    quickEdit: Action;
    duplicate: Action;
  }
  
  export interface Action {
    title: string;
    url: string;
    class: string;
    other: string;
  }
  
  export interface Links {
    self: Link[];
    collection: Link[];
  }
  
  export interface Link {
    href: string;
    targetHints: TargetHints;
  }
  
  export interface TargetHints {
    allow: string[];
  }
  