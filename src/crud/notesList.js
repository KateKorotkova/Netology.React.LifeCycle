import {useEffect, useState} from "react";
import { nanoid } from 'nanoid'
import {Note} from "./note";
import { FiRefreshCcw } from 'react-icons/fi';



function NotesList() {
    const [form, setForm] = useState({content: ""});
    const [notes, setNodes] = useState([]);


    const handleFormChange = (e) => {
        let {name, value} = e.target;
        setForm(prevForm => ({...prevForm, [name]: value}))
    }


    const updateNotes = () => {
        loadNotes(setNodes);
    }


    const addNote = (e) => {
        e.preventDefault();
        fetch('http://localhost:7777/notes', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": nanoid(),
                "content" : form.content 
            })
        })
        .then(() =>{
            setForm(prevForm => ({...prevForm, content: ""}))
            loadNotes(setNodes);
        });
    }


    const deleteNote = (id) => {
        fetch(`http://localhost:7777/notes/${id}`,
        {
            method: 'DELETE'
        })
        .then(() =>{
            loadNotes(setNodes);
        });
    }


    useEffect(() => {
        loadNotes(setNodes);
    }, []);




    return (
        <>
        <div className="notes-block">
            <div className="notes-header">
                <span className="notes-header-refresh">Notes</span>
                <button onClick={updateNotes}><FiRefreshCcw/></button>
            </div>
            <div className="notes">
                {
                    notes.map((x) => { return <Note key={x.id} id={x.id} content={x.content} deleteNote={deleteNote}/>;})
                }
            </div>

            <div className="note-addition-form">
                <form onSubmit={addNote}>
                    <label htmlFor="name">New note</label>
                    <br/>
                    <textarea id="content" name="content" value={form.content} onChange={handleFormChange}></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
        </>
    );
}



function loadNotes(notesSetter) {
    fetch("http://localhost:7777/notes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        notesSetter(data);
    })
    .catch(function() {
        console.error("Can not download notes");
    });
}



export {NotesList};