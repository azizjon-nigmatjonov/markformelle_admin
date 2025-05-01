import { ImageViewer } from "../../../../components/UI/ImageViewer";
import { useState } from "react";

interface Props {
  TableList: any;
}

export const TableUI = ({ TableList = [] }: Props) => {
  const [imageView, setImageView] = useState("");
  return (
    <>
      <div className="overflow-x-auto c-table">
        <table className="min-w-full text-left">
          <thead className="header">
            <tr>
              <th className="cell border-r border-[var(--border)]">
                <h3 className="px-2">Image Process</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">RECETEASAMAID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">RECETEGRAFIKID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">RECETEALTASAMAID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">SIRA</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">URUNID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">RECETEID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">URUNBIRIMID</h3>
              </th>
              <th className="cell">
                <h3 className="px-2">RECETEDETAYID</h3>
              </th>
            </tr>
          </thead>
          <tbody className="body">
            {TableList.map((row: any, outerIndex: number) =>
              row.rows.map((item: any, innerIndex: number) => (
                <tr
                  key={`${outerIndex}-${innerIndex}`}
                  className="border-t border-[var(--border)] row"
                >
                  {innerIndex === 0 && (
                    <td
                      rowSpan={row.rows.length}
                      className="border-r border-[var(--border)] align-top ccell cell"
                    >
                      <div
                        className="p-2 hover:scale-[1.008] duration-200 cursor-pointer"
                        onClick={() => setImageView(row.image)}
                      >
                        <img
                          src={row.image}
                          alt="Main"
                          className="w-full h-auto"
                        />
                      </div>
                    </td>
                  )}

                  <td className="cell">
                    <p className="px-2 py-2.5 font-medium">
                      {item.RECETEASAMAID}
                    </p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.RECETEGRAFIKID}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.RECETEALTASAMAID}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.SIRA}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.URUNID}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.RECETEID}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.URUNBIRIMID}</p>
                  </td>
                  <td className="cell">
                    <p className="px-2 py-1">{item.RECETEDETAYID}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
    </>
  );
};
