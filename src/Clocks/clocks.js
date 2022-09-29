import {useEffect, useState} from "react";
import { nanoid } from 'nanoid'
import { BiCrosshair } from "react-icons/bi";


function Clocks() {
    const [form, setForm] = useState({name: "", zone: ""});
    const [clocks, setClocks] = useState([]);
    const [removedClock, setRemovedClock] = useState({});


    const handleFormChange = (e) => {
        let {name, value} = e.target;
        setForm(prevForm => ({...prevForm, [name]: value}))
    }


    const addClock = (e) => {
        e.preventDefault();
        let utcDate = getUtcDate(form.zone);
        let newClock = {
            id: nanoid(),
            name: form.name,
            zone: form.zone,
            date: utcDate,
            hours: utcDate.getHours(),
            minutes: utcDate.getMinutes(),
            seconds: utcDate.getSeconds()
        };
        let interval = window.setInterval(() => {updateClock(newClock)}, 1000);
        newClock.interval = interval;

        setClocks(prevClocks => ([...prevClocks, newClock]));
    }

    
    const removeClock = (id) => {
        let clockToRemove = clocks.find(x => x.id === id);
        setRemovedClock(clockToRemove);
        setClocks(prevClocks => prevClocks.filter(x => x.id !== clockToRemove.id));
    }


    const updateClock = (clock) => {
        let date = clock.date;
        date.setSeconds(new Date().getUTCSeconds() + 1);
        
        setClocks(prevClocks => {
            let clockIndex = prevClocks.findIndex(x => x.id == clock.id);
            if (clockIndex != -1) {
                let localClocks = [...prevClocks];
                let item = {...localClocks[clockIndex]};
                
                item.hours = item.date.getHours();
                item.minutes = item.date.getMinutes();
                item.seconds = item.date.getSeconds();
                
                localClocks[clockIndex] = item;
                return localClocks;
            }
        });
    }


    useEffect(() => {
        window.clearInterval(removedClock.interval);
    }, [removedClock]);




    return (
        <>
        <div className="clocks-form">
            <form onSubmit={addClock}>
                <div className="clocks-main">
                    <div className="clocks-main-block" style={{ marginRight: "70px"}}>
                        <label htmlFor="name">Название</label>
                        <br/>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange}></input>
                    </div>
                    <div className="clocks-main-block" style={{ marginRight: "20px"}}>
                        <label htmlFor="zone">Временная зона</label>
                        <br/>
                        <input type="number" id="zone" name="zone" value={form.zone} onChange={handleFormChange}></input>
                    </div>
                    <div className="clocks-main">
                        <button type="submit">Добавить</button>
                    </div>
                </div>
            </form>
            <div>
                {
                    clocks.map((x) => {
                        return (<>
                                <div style={{padding: "10px"}}>
                                    <span>{x.name}</span>
                                    <button onClick={() => {removeClock(x.id)}}><BiCrosshair/></button>
                                    <br/>
                                    <span>{addLeadingZeros(x.hours)}</span><span>::</span>
                                    <span>{addLeadingZeros(x.minutes)}</span><span>::</span>
                                    <span>{addLeadingZeros(x.seconds)}</span>
                                </div>
                                
                            </>);
                    })
                }
            </div>
        </div>
        </>
    );
}



function getUtcDate(zone) {
    var currentDate = new Date();
    let utcDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 
        currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
    
    utcDate.setHours(utcDate.getHours() + Number(zone ?? 0));
    return utcDate;
}


function addLeadingZeros(num) {
    return String(num).padStart(2, '0');
}



export {Clocks};