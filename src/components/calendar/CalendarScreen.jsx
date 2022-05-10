import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {messages} from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventStartLoading, setActive, setInactive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);

    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(()=>{

        dispatch(eventStartLoading());

    }, [dispatch])

    const onDoubleClcik = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelect = (e) => {
        dispatch(setActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    };

    const onSelectSlot = (e) => {
        dispatch(setInactive());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        };
    }

    return (
        <div className="calendar-screen">
        
            <Navbar/>

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{  }}
                messages= {messages}
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={onDoubleClcik}
                onSelectEvent={onSelect}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal/>
                
            <AddNewFab />
            
            {
                (activeEvent)
                &&  <DeleteEventFab/>
            }


        </div>

    )
}
