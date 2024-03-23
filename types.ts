export interface Item {
  objectID: string;
  ascensionNumber?: number;
  series?: string;
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
  barcode?: string;
  kitId?: string;
  highlighted: boolean;
}

export enum ItemType {
  book = 'Book',
  movie = 'Movie',
  music = 'Music',
}

export enum Group {
  family = 'Family',
  children = 'CH',
  junior = 'Jr',
  youth = 'Y',
  ginosPick = "Gino's Pick",
}

export const groupToLabel: Record<Group, string> = {
  Family: 'Family',
  CH: 'Children',
  Jr: 'Junior',
  Y: 'Youth',
  "Gino's Pick": "Gino's Pick",
};

export enum Category {
  APOL = 'APOL',
  ARC = 'ARC',
  'B/St' = 'B/St',
  BIB = 'BIB',
  BIO = 'BIO',
  CH = 'CH',
  CHAR = 'CHAR',
  CHR = 'CHR',
  COM = 'COM',
  COU = 'COU',
  DEV = 'DEV',
  DR = 'DR',
  EAS = 'EAS',
  ENT = 'ENT',
  EXP = 'EXP',
  FAM = 'FAM',
  FIC = 'FIC',
  FUT = 'FUT',
  HEA = 'HEA',
  HIS = 'HIS',
  HistF = 'HistF',
  LEA = 'LEA',
  MAR = 'MAR',
  MEN = 'MEN',
  MIS = 'MIS',
  MOR = 'MOR',
  MUS = 'MUS',
  NonF = 'NonF',
  NT = 'NT',
  OT = 'OT',
  OTH = 'OTH',
  PAR = 'PAR',
  PRAY = 'PRAY',
  REL = 'REL',
  SCI = 'SCI',
  STU = 'STU',
  SUF = 'SUF',
  TA = 'TA',
  THE = 'THE',
  WOM = 'WOM',
  WOR = 'WOR',
}

export const Categories: { [category in Category]: string } = {
  APOL: 'Apologetics',
  ARC: 'Archives',
  'B/St': 'Bible Study',
  BIB: 'The Bible',
  BIO: 'Biography',
  CH: 'Childrens',
  CHAR: 'Character Studies',
  CHR: 'Christian Living',
  COM: 'Comedy',
  COU: 'Biblical Discipleship',
  DEV: 'Devotional literature',
  DR: 'Drama',
  EAS: 'Easy readers/Board books',
  ENT: 'Entertainment',
  EXP: 'Exploration',
  FAM: 'Family',
  FIC: 'Fiction',
  FUT: 'Future events',
  HEA: 'Health',
  HIS: 'History of Christianity',
  HistF: 'Historical Fiction',
  LEA: 'Church Leadership',
  MAR: 'Marriage',
  MEN: 'Men',
  MIS: 'Missions',
  MOR: 'Moral issues/Christian ethics',
  MUS: 'Music',
  NonF: 'NonFiction',
  NT: 'New Testament',
  OT: 'Old Testament',
  OTH: 'Other Religions',
  PAR: 'Parenting',
  PRAY: 'Prayer/Worship',
  REL: 'Relationships',
  SCI: 'Science',
  STU: 'Study tools',
  SUF: 'Suffering',
  TA: 'Christian Education',
  THE: 'Theology',
  WOM: 'Women',
  WOR: 'Worship Music',
};
