export interface Item {
  objectID: string;
  ascensionNumber?: number;
  group?: Group;
  category?: Category;
  creator?: string;
  genres?: string;
  deweyDecimal?: string;
  type?: ItemType;
  isbn?: string;
  pages?: number;
  releaseDate?: string;
  createdDate?: string;
  title?: string;
  synopsis?: string;
  url?: string;
  imageUrl?: string;
  amazonID?: string;
  format?: string;
  highlighted: boolean;
}

export enum ItemType {
  book = 'Book',
  movie = 'Movie',
  music = 'Music',
}

export enum Group {
  adult = 'Adult',
  youth = 'Youth',
  family = 'Family',
  junior = 'Junior',
  childrens = 'Childrens',
  ginosPick = "Gino's Pick",
}

export enum Category {
  APOL = 'APOL',
  ARC = 'ARC',
  'B/St' = 'B/St',
  BIB = 'BIB',
  BIO = 'BIO',
  CH = 'CH',
  CHR = 'CHR',
  COM = 'COM',
  DEV = 'DEV',
  DR = 'DR',
  EAS = 'EAS',
  ENT = 'ENT',
  ESC = 'ESC',
  FIC = 'FIC',
  HEA = 'HEA',
  HIS = 'HIS',
  LEA = 'LEA',
  MAR = 'MAR',
  MIS = 'MIS',
  MOR = 'MOR',
  MUS = 'MUS',
  PAR = 'PAR',
  REL = 'REL',
  SCI = 'SCI',
  TA = 'TA',
  THE = 'THE',
}

export const Categories: { [category in Category]: string } = {
  APOL: 'Apologetics',
  ARC: 'Archives',
  'B/St': 'Bible Study/St',
  BIB: 'The Bible',
  BIO: '(Auto)Biography (testimony)',
  CH: 'Childrens',
  CHR: 'Christian Living',
  COM: 'Comedy',
  DEV: 'Devotional literature',
  DR: 'Drama',
  EAS: 'Easy reading (learn to read)',
  ENT: 'Entertainment (incl. crafts, food, games)',
  ESC: 'Eschatology (future events, death)',
  FIC: 'Fiction',
  HEA: 'Health',
  HIS: 'History of Christianity',
  LEA: 'Church Leadership',
  MAR: 'Marriage',
  MIS: 'Missions',
  MOR: 'Moral issues/Christian ethics',
  MUS: 'Music',
  PAR: 'Parenting',
  REL: 'Other religions',
  SCI: 'Science',
  TA: 'Teaching Aids (Christian Education)',
  THE: 'Theology (incl. sermons)',
};
