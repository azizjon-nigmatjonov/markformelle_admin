export const Cards = ({ CardData }: { CardData: any }) => {
  console.log("CardData", CardData);

  return (
    <div className="flex gap-x-2 w-full pt-5">
      <div className="p-2">
        <div className="h-[30px]"></div>
        <div className="p-2 text-right text-[var(--gray)]">
          <p>Kilo</p>
          <p>Metre</p>
        </div>
      </div>
      <div className="grid grid-cols-9 gap-x-2 w-full text-center">
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-red-100 flex items-center justify-center">
            <span className="text-red-700">Girisleri</span>
          </div>
          <div className="p-2">
            <p>15.55</p>
            <p>0.00</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-red-100 flex items-center justify-center">
            <span className="text-red-700">Stok Dormunu</span>
          </div>
          <div className="p-2">
            <p>15.55</p>
            <p>0.00</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-red-400 flex items-center justify-center">
            <span className="text-red-700">Secilen</span>
          </div>
          <div className="p-2">
            <p>15.55</p>
            <p>0.00</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-green-300 flex items-center justify-center">
            <span className="text-green-700">Siparis Net</span>
          </div>
          <div className="p-2">
            <p>15.55</p>
            <p>0.00</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-blue-300 flex items-center justify-center">
            <span className="text-blue-700">Siparis Brut</span>
          </div>
          <div className="p-2">
            <p>{CardData.SIPARISBRUTKILO}</p>
            <p>{CardData.SIPARISBRUTMETRE}</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-green-300 flex items-center justify-center">
            <span className="text-green-700">Partilenen</span>
          </div>
          <div className="p-2">
            <p>0</p>
            <p>0</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-green-300 flex items-center justify-center">
            <span className="text-green-700">Rezerve Edilen</span>
          </div>
          <div className="p-2">
            <p></p>
            <p></p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-red-200 flex items-center justify-center">
            <span className="text-red-700">Secilen Toplam</span>
          </div>
          <div className="p-2">
            <p>0.00</p>
            <p>0.00</p>
          </div>
        </div>
        <div className="p-2 rounded-[8px] bg-white shadow-md border border-[var(--border)]">
          <div className="h-[30px] w-full rounded-[8px] bg-red-200 flex items-center justify-center">
            <span className="text-red-700">Kalan Toplam</span>
          </div>
          <div className="p-2">
            <p>999.00</p>
            <p>0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};
