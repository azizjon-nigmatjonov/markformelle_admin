import {CollapseUI} from "../../../../components/CElements/CCollapse";
import {ModalTypes} from "../interfaces";
import { PartianTable} from "../Tables/Partion";
import {OrderForm} from "./Form";
import {OrderModalBaseLogics} from "./Logic";
import {PaintTablesUI} from "./PaintTablesUI";

interface ModalUIProps {
    defaultData?: ModalTypes;
    setOpen: (open : boolean) => void;
    refetch: () => void;
}

export const OrderModal = ({
    refetch,
    defaultData = {
        BOYASIPARISKAYITID: 0
    },
    setOpen
} : ModalUIProps) => {
    const {
        currentMaterial,
        currentPaint,
        formId,
        uniqueID,
        createForm,
        updateForm,
        formData,
        handleModalActions,
        handleActionsTable,
        setCurrentPaint
    } = OrderModalBaseLogics({defaultData, refetch});


    const handleModalClose = (status : string) => {
        handleModalActions(status);
        if (status === "close") {
            setOpen(false);
        }
    };

    return (
        <div className="space-y-5 overflow-y-auto designed-scroll max-h-[calc(100vh-200px)]">
            <OrderForm handleModalActions={handleModalClose}
                createForm={createForm}
                updateForm={updateForm}
                formData={formData}
                uniqueID={uniqueID}/>
            <div>
         
            <CollapseUI title="Boya Siparis Detay Girisi" disabled>
                <PaintTablesUI handleActionsTable={
                        (obj : any, status : string, type : string) => {
                            handleActionsTable(obj, status, type);
                        }
                    }
                    setCurrentPaint={setCurrentPaint}
                    uniqueID={uniqueID}
                    currentPaint={currentPaint}
                    formId={
                        formId ?? 0
                    }/>
            </CollapseUI>
            <CollapseUI title="Partiya" disabled>
                    <PartianTable handleActionsTable={
                            (obj : any, status : string, type : string) => {
                                handleActionsTable(obj, status, type);
                            }
                        }
                        uniqueID={uniqueID}
                        currentMaterial={currentMaterial}
                        formId={
                            formId ?? 0
                        }/>
                </CollapseUI>
    </div>
</div>
    );
};
