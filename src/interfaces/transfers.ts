export interface ITransferElement {
  id?: number; 
  IRSALIYENO?: string;
  IRSALIYETARIHI?: string;
  DEPOID?: string;
  TRANSFERDEPOID?: string;
  DOVIZID?: string;
  URUNID?: string
  STOKDETAYID?: string
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

export interface ITransferFormData {
  IRSALIYENO: string;
  IRSALIYETARIHI: string;
  DEPOID: string;
  DOVIZID: string;
  INSERTTARIHI: string;
  TRANSFERDEPOID?: string | null; // Ensure it's optional
  FIRMAID?: string
  ADI?: string
}