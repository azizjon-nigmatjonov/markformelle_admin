import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";

interface MaterialFormProps {
  handleActions: (val: string, val2: any) => void;
}

export const MaterialForm = ({ handleActions }: MaterialFormProps) => {
  return (
    <CNewMiniModal title="material form" handleActions={handleActions}>
      material form
    </CNewMiniModal>
  );
};
