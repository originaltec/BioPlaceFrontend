export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: CategoryImage;
  menuOrder: number;
  count: number;
  _links: Links;
}

export interface CategoryImage {
  id: number;
  dateCreated: string;
  dateCreatedGmt: string;
  dateModified: string;
  dateModifiedGmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  up: Up[];
}

export interface Self {
  href: string;
  targetHints: TargetHints;
}

export interface TargetHints {
  allow: string[];
}

export interface Collection {
  href: string;
}

export interface Up {
  href: string;
}
