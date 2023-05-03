import React from 'react'
import './Notes.css'
import { useSelector, useDispatch } from 'react-redux'
import NotesItem from './NotesItem'
import { useEffect, useState } from 'react'
import Loder from './Loder'
import { addnote, getAllnotes } from '../UserAction/UserAction'
import { useNavigate } from 'react-router-dom'
// import { allnotes_fail } from '../Constants/Constants'
import { Fragment } from 'react'

const Notesapp = () => {

const navigate=useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({ title: "", description: "" })

  function Onchange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const AddNote = (e) => {
    e.preventDefault()
    if(data.title==="" || data.description===""){
      alert("enter valid title and description")
    }
      dispatch(addnote(data.title, data.description))
      data.title="";
      data.description=""
       dispatch(getAllnotes())

  }
  const { loading, sucess, notes, error } = useSelector(state => state.notes)
  const { isAuthenticated } = useSelector(state => state.user)


  useEffect(() => {

    if(sucess){
      dispatch(getAllnotes())
    }
  }, [loading, isAuthenticated,sucess, error,dispatch])


  return (
    <>
      {loading ? <Loder /> :
        <Fragment>
          <div className="addnote">
            <h1>Add Your Note</h1>

            <div className="notes_container">


              <form >
                <label htmlFor="title"><strong>Title :</strong></label>

                <input type="text" id='title' name='title' onChange={Onchange} />

                <label htmlFor="description" className='description'><strong>Description :</strong></label>
                <textarea type="text" id='description' name='description' onChange={Onchange} />

                <button onClick={AddNote}>Add</button>
              </form>
            </div>
          </div>


          <div className="notes">
            {notes===null||notes ===undefined ||notes.length === 0?
              <h1 className='np'>You do not have any notes</h1> :
              <>
                <h1 className='np'>Your Notes</h1>
                <div className="notes_main">
                  {
                    notes.map(function (e) {

                      return <NotesItem key={e._id} data={e} />
                    })
                  }

                </div>
              </>
            }
          </div>
        </Fragment>
      }
    </>
  )
}

export default Notesapp