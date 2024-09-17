import { useEffect, useRef, useState } from 'react';
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import './style.scss'
import CircularProgress from '../../../../components/CElements/CCircularProgress';
// import { getAdaptiveValue } from '../../../../utils/getAdaptiveValue'
import { Bolt, WifiOff } from "@mui/icons-material";
import { Modal } from '@mui/joy';
import ModalCard from '../Card/ModalCard';
interface Props {
    machine: any;
    zoomPoint: number
}

export const MyCard = ({ machine }: Props) => {
    const [size, setSize] = useState<number>(50);
    const cardRef: any = useRef(null);

    const updateSize = () => {
        if (window.screen.width < 980 && window.screen.width > 940) {
            setSize(cardRef?.current?.clientWidth * 0.50);
        } else {
            setSize(cardRef?.current?.clientWidth * 0.55);
        }
    };


    useEffect(() => {
        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const [cardColor, setCardColor] = useState<string>("");
    const [open, setOpen] = useState(false);


    const getCardColor = (): string => {
        if (machine.no_connnection == "true") {
            return "grey";
        } else if (machine.pkol_knit == 0) {
            return "purple";
        } else if (
            machine.rotation > 0 &&
            machine.not_broken == "true" &&
            machine.machine_is_on == "true"
        ) {
            if (
                machine.yarn_replacement == "true" &&
                machine.pkol_knit - machine.fkol_knit < 30 &&
                machine.pkol_knit - machine.fkol_knit > 0
            ) {
                return "orange";
            } else return "green";
        } else if (
            machine.not_broken == "true" &&
            machine.machine_is_on == "false"
        ) {
            return "purple";
        } else if (
            machine.not_broken == "false" &&
            machine.machine_is_on == "false"
        ) {
            return "grey";
        } else if (
            machine.not_broken == "true" &&
            machine.machine_is_on == "true" &&
            machine.rotation == 0
        ) {
            return "red";
        } else {
            return ""; // Handle any other case if needed
        }
    };

    useEffect(() => {
        setCardColor(getCardColor());
    }, [machine]);

    return <>
        <div ref={cardRef} onClick={(e: any) => {
            e.stopPropagation()
            setOpen(!open)
        }} className={`h-full w-full wrapper relative mycard ${cardColor}`} style={{ zoom: window.screen.width < 940 ? 0.8 : window.screen.width > 1920 ? 1 : 0.6 }}>
            {machine.no_connnection == "true" && (
                <div className='flex flex-col items-center'>
                    <p className='title'>{machine.name}</p>
                    <div className='flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2'>
                        <div className='image'><WifiOff /></div>
                        <p className='sub-title font-semibold'>Нет соединения</p>
                        <p className='text'>{machine.ip_address}</p>
                    </div>
                </div>
            )}
            {machine.no_connnection != "true" && (
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex justify-between items-center'>
                        <div className='sub-title'>
                            <ViewDayOutlinedIcon />
                            <span> {machine.new_rolls}</span>
                        </div>
                        <p className="title">{machine.name}</p>
                        <div className='sub-title'>
                            {machine.defect_num}
                        </div>
                    </div>
                    <div className={`w-full flex justify-center py-1 ${window.screen.width < 940 || window.screen.width > 980 ? '' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
                        <CircularProgress strokeWidth={window.screen.width > 1920 ? 20 : size > 80 ? 10 : 5} value={Number(machine.fakt_percentage) > 100
                            ? 100
                            : Number(machine.fakt_percentage)} maxValue={100} size={size} >
                            <div>
                                <p className='text inner'>{machine.fkol_knit}</p>
                                <div className='w-full h-[1px] bg-[var(--border)]'></div>
                                <p className='text inner'>
                                    {machine.pkol_knit + " Kg"}
                                </p>
                            </div>
                        </CircularProgress>
                    </div>
                    <div className='flex justify-between items-end'>
                        <p className='text'>{machine.soft_version}</p>
                        <p className='text'><Bolt />{machine.efficiency + "%"}</p>
                    </div>
                </div>
            )}


        </div>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ModalCard machine={machine} setOpen={setOpen} />
        </Modal></>
}