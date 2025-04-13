import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
const Calendar = () => {
    const [events, setEvents] = useState([
        {
            title: 'Consulta Legal',
            start: new Date(2025, 3, 12, 10, 0),
            end: new Date(2025, 3, 12, 11, 0),
        },
    ]);
    return (_jsxs("div", { className: 'p-6 bg-white rounded-lg shadow-md', children: [_jsx("h2", { className: 'text-xl font-semibold mb-4', children: "Calendario de Citas" }), _jsx(BigCalendar, { localizer: localizer, events: events, startAccessor: 'start', endAccessor: 'end', style: { height: 500 }, messages: {
                    today: 'Hoy',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                } })] }));
};
export default Calendar;
