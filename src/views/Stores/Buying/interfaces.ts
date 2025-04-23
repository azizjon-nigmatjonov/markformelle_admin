export interface ModalTypes {
  IRSALIYENO?: string;
  URUNID?: string
  IRSALIYEID?: string
  }

  export interface IModalForm {
    IRSALIYENO: string
    INSERTTARIHI: string
  }

  export interface IBuyingForm {
    IRSALIYEID: string
    DEPOID: string
    TRANSFERDEPOID?: string 
    INSERTTARIHI?: string
    IRSALIYETARIHI?: string
    IRSALIYENO: string
    FIRMAID: string
    FIRMAADI: string
    DOVIZID?: string
    NOTU: string
    SINIF: string
  }