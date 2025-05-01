import { ImageViewer } from "../../../../components/UI/ImageViewer";
import { useState } from "react";

interface Props {
  TableList: any;
}

export const TableUI = ({ TableList = [] }: Props) => {
  const [imageView, setImageView] = useState("");
  return (
    <div className="space-y-3">
      {TableList.map((table: any, tableIndex: number) => (
        <div
          key={tableIndex}
          className={`rounded-[12px] p-3 flex space-x-3`}
          style={{ backgroundColor: "#a4f4cf" }}
        >
          <div
            className="hover:scale-[1.008] duration-200 cursor-pointer w-[45%]"
            onClick={() => setImageView(table.image)}
          >
            <img src={table.image} alt="Main" className="w-full h-auto" />
          </div>
          <div key={table} className={`overflow-x-auto c-table w-full`}>
            <table className="min-w-full text-left">
              <thead className="header">
                <tr>
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
              <tbody className="body space-y-2">
                {table.rows.map((item: any, innerIndex: number) => (
                  <tr
                    key={innerIndex}
                    className={`row relative`}
                    style={{
                      backgroundColor: "white",
                      borderBottom: "8px solid #a4f4cf",
                      borderRadius: "8px !important",
                      overflow: "hidden",
                    }}
                  >
                    {item.RECETEASAMAID ? (
                      <td className="cell relative">
                        <p className="p-2 font-medium">{item.RECETEASAMAID}</p>
                      </td>
                    ) : (
                      <>
                        {" "}
                        <td className="cell relative">
                          <p className="p-2 font-medium">
                            {item.RECETEASAMAID}
                          </p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.RECETEGRAFIKID}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.RECETEALTASAMAID}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.SIRA}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.URUNID}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.RECETEID}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.URUNBIRIMID}</p>
                        </td>
                        <td className="cell relative">
                          <p className="p-2">{item.RECETEDETAYID}</p>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <ImageViewer url={imageView} closeViewer={() => setImageView("")} />
    </div>
  );
};
