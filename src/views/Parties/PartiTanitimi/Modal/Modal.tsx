import { useEffect, useState } from "react";
import { Form } from "./Form";
import { Tables } from "./Tables";

export const ModalUIPartiTanitimi = ({ defaultData }: { defaultData: any }) => {
  const [formId, setFormId] = useState(0);

  useEffect(() => {
    if (defaultData?.PARTIKAYITID) {
      setFormId(defaultData.PARTIKAYITID);
    }
  }, [defaultData]);

  return (
    <div>
      <Form
        formId={formId}
        setFormId={setFormId}
        defaultData={defaultData}
        refetchTable={() => {}}
      />
      <Tables formId={formId} />
    </div>
  );
};
