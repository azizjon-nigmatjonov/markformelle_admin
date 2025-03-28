export interface ITransferElement {
  id?: number; 
  IRSALIYENO?: string;
  IRSALIYETARIHI?: string;
  DEPOID?: string;
  TRANSFERDEPOID?: string;
  DOVIZID?: string;
  URUNID?: string
}

export interface ITransferCreate {
  INSERTTARIHI: string;
  IRSALIYETARIHI: string;
  DOVIZID: string;
  TRANSFERDEPOID: string;
  DEPOID: string;
  IRSALIYENO: string
  HAREKETTIPI: number
  FIRMAID: null
  NOTU: string;
  SINIF: string
  INSERTKULLANICIID: number
  KULLANICIID: number
  DEGISIMTARIHI: string
}

export interface IFormData {
  IRSALIYENO: string;
  IRSALIYETARIHI?: string;
  INSERTTARIHI?: string;
  DEPOID?: string;
  TRANSFERDEPOID?: string;
  DOVIZID?: string;
}
