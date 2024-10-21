import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const generateCalendar = () => {
        let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
        let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

        let daysArray = [];

        // Days from the previous month
        for (let i = firstDayOfMonth; i > 0; i--) {
            daysArray.push({
                day: lastDateOfLastMonth - i + 1,
                isCurrentMonth: false,
            });
        }

        // Days of the current month
        for (let i = 1; i <= lastDateOfMonth; i++) {
            daysArray.push({
                day: i,
                isCurrentMonth: true,
                isToday:
                    i === currentDate.getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear(),
            });
        }

        // Days of the next month
        for (let i = lastDayOfMonth; i < 6; i++) {
            daysArray.push({
                day: i - lastDayOfMonth + 1,
                isCurrentMonth: false,
            });
        }

        setDays(daysArray);
    };

    const prevMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const nextMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    useEffect(() => {
        generateCalendar();
    }, [currentDate]);

    return (
        <div className="wrapper">
            <header>
                <p className="current-date">{`${months[currentMonth]} ${currentYear}`}</p>
                <div className="icons">
                    <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={prevMonth} />
                    <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={nextMonth} />
                </div>
            </header>
            <div className="calendar">
                <ul className="weeks">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tues</li>
                    <li>Wed</li>
                    <li>Thur</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="days">
                    {days.map((dayObj, index) => (
                        <li
                            key={index}
                            className={`${dayObj.isCurrentMonth ? '' : 'inactive'} ${dayObj.isToday ? 'active' : ''
                                }`}
                        >
                            {dayObj.day}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calendar;
