export interface ModalTypes {
  URUNID?: string;
  RECETEID: string;
}

export interface IModalForm {
  URUNID: string;
  ADI: string;
  URUNTIPIID: number;
  BOYATIPIID: number;
  MUTFAKDEPONO: string;
  UNITEID: number;
  KIMYASALTIPIID: string;
  KDVORANI: number;
  NOTU?: string | undefined;
  TEMINSURESI: number;
  RAF: string;
  TRANSFERKODU: string;
  ENVANTEREDAHIL: boolean;
  SONALISSTOKDETAYID: string;
  SONALISTARIHI: string;
  BARKOD?: string;
  KAPALI: boolean;
  INSERTKULLANICIID: number;
  INSERTTARIHI?: string;
  DEGISIMTARIHI: string;
  KULLANICIID: number;

  UNITEADI?: string;
  URUNTIPIADI?: string;
  BOYATIPIADI?: string;
  KULLANICIADI?: string;
  URUNADI?: string;
}
