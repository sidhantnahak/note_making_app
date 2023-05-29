import React, { useEffect, useState } from 'react'
import './NotesItem.css'
import { deletenote, updatenote,getAllnotes } from '../UserAction/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const NotesItem = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, sucess, error } = useSelector(state => state.notes)

  const { data } = props;
  // let myid=data._id;
  const [credentials, Setcredentials] = useState({ etitle: "", edescription: "" })

  function onchange(e) {
    Setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  var modal = document.getElementById("myModal");

  // var span = document.getElementsByClassName("close")[0];



  window.onclick = function (event) {
    modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  const closehandler = () => {
    modal = document.getElementById("myModal");
    modal.style.display = "none";
    navigate('/notes')
  }

  const Openhandler = () => {
    navigate(`/notes/update/${data._id}`)
    modal = document.getElementById("myModal");
    modal.style.display = "block";
  }


  const update = () => {
    dispatch(updatenote(params.id, credentials.etitle, credentials.edescription));
    navigate('/notes')


  }
  useEffect(() => {
    // if (error) {
    //   alert(error)
    // }
    if(sucess){
      dispatch(getAllnotes())
    }

  }, [loading, sucess, dispatch, navigate, error])



  return (
    <>
      <div className='notesitem'>

        <h className='title'>{data.title}</h>

        <p className='description'>{data.description}</p>

        <div className="buttons" >

          <i onClick={Openhandler} id="myBtn" className="fa-sharp fa-solid fa-file-pen"></i>
          <i onClick={() => dispatch(deletenote(data._id))} className="fa-solid fa-trash"></i>
        </div>




      </div>


      <div id="myModal" className="modal">

        <div className="modal-content">

          <span onClick={closehandler} className="close">&times;</span>
          <h3>Edit your note</h3>
          <div className="modal_detail">


            <label htmlFor="etitle"><strong>Title : </strong></label><br />
            <input type="text" name='etitle' id='etitle' onChange={onchange} /><br />

            <label htmlFor="edescription"> <strong>Description : </strong></label><br />
            <textarea type="text" name='edescription' id='edescription' onChange={onchange} />
          </div>
          <div>

            <button onClick={() => modal.style.display = "none"}>Back</button>
            <button onClick={update} >Save</button>
          </div>
        </div>


      </div>


    </>
  )
}

export default NotesItem