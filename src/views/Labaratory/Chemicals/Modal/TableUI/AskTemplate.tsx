export const AskTemplate = ({
  handleActions,
}: {
  handleActions: (val: string) => void;
}) => {
  return (
    <>
      <div>
        <ul>
          <li className="border-b px-3 py-2">
            <button>Bu Atisin Kapyasini Olustur</button>
          </li>
          <li
            onClick={() => {
              handleActions("fetch_template");
            }}
            className="border-b px-3 py-2"
          >
            <button>Sablondan Uretim Recetesi Olustur</button>
          </li>
          <li className="px-3 py-2">
            <button>Uretim Recetesi Olustur</button>
          </li>
        </ul>
      </div>
    </>
  );
};
