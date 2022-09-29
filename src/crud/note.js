import { BsFillTrashFill } from "react-icons/bs";


function Note({id, content, deleteNote}) {
    return (
        <>
        <div className="node-block">
            <button onClick={() => deleteNote(id)}> <BsFillTrashFill/> </button>
            <div>
                <textarea readOnly value={content}/>
            </div>
        </div>
        </>
    );
}


export {Note};