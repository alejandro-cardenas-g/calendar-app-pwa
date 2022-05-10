import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { startAddNew, setInactive, eventStartUpdate } from '../../actions/calendar';

const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

if(process.env.NODE_ENV !== "test" ){
    Modal.setAppElement('#root');
}

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const finish = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: finish.toDate()
};

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( finish.toDate() );
    const [titleValid, setTitleValid] = useState(true);

    const [formvalues, setFormvalues] = useState(initEvent);

    const {title, notes, start, end} = formvalues;

    useEffect(() => {
      
        if(activeEvent){
            setFormvalues(activeEvent);
        }else{
            setFormvalues(initEvent);
        }
    
    }, [activeEvent])
    

    const handleInputChange = ({target}) => {
        setFormvalues({
            ...formvalues,
            [target.name]: target.value
        });
    }

    const closeModal = () =>{
        
        dispatch(uiCloseModal());
        setFormvalues(initEvent);
        dispatch(setInactive());
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormvalues({
            ...formvalues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormvalues({
            ...formvalues,
            end: e
        });
    }

    const handleSubmit = (e) => {

        e.preventDefault(); 
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if( momentStart.isSameOrAfter(momentEnd) )
        {
            Swal.fire(
                'Error', 'La fecha final debe ser mayor a la inicial', 'error'
            )
            return;
        }

        if(title.trim().length < 2){
            setTitleValid(false);
            return;
        }

        

        if(activeEvent){
            
            dispatch(eventStartUpdate( {...formvalues} ));
           

        }else{
            dispatch(startAddNew({
                ...formvalues
            }));

            // dispatch(eventAddNew({
            //     ...formvalues,
            //     id: new Date().getTime(),
            //     user: {
            //         _id: "123",
            //         name: "Andrés"
            //     }
            // }));

        }

        setTitleValid(true);
        closeModal();

    }


    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            ariaHideApp={(!process.env.NODE_ENV === 'test') && false}
        >
            <h1> 
                {`${activeEvent ? 'Actualizar ' : 'Nuevo'  } Evento`}
            </h1>

            <hr />
            <form onSubmit={handleSubmit} className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        onChange={handleStartDateChange} 
                        value={start} 
                        className="form-control" 
                        name="start"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={handleEndDateChange} 
                        value={end} 
                        className="form-control" 
                        minDate={ dateStart }
                        name="end"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${(!titleValid) && ' is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
        
    )
    
}
