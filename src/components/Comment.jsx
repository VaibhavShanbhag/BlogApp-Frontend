import axios from "axios"
import { BiEdit } from "react-icons/bi"
import { MdDelete, MdEdit } from "react-icons/md"
import { URL } from "../url"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { message } from "antd"

const Comment = ({ c, post }) => {
  const [modal, setModal] = useState(false)
  const [comment, setComment] = useState("");
  const timestampString = c.timestamp;
  const date = new Date(timestampString.replace(/(\d{4})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})/, '$1-$2-$3T$4:$5:$6'));
  const dateString = date.toLocaleDateString()
  const timeString = date.toLocaleTimeString()

  const { user } = useContext(UserContext)
  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true })
      window.location.reload(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  const editComment = async(id) => {
    try {
      const body = {
        ...c,
      }
      body.comment = comment;
      await axios.put(URL + "/api/comments/" + id, body, { withCredentials: true })
      window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-600">@{c.author}</h3>
          <div className="flex justify-center items-center space-x-2">
            <p>{dateString}</p>
            <p>{timeString}</p>
            {user?.userid == c?.userid ?
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={() => deleteComment(c.commentid)}><MdDelete /></p>
                <p className="cursor-pointer" onClick={() => setModal(true)}><MdEdit /></p>
              </div> : ""}

          </div>
        </div>
        <p className="px-4 mt-2">{c.comment}</p>


      </div>
      
      {modal && (
        <div className="modal border rounded-md p-2">
          <div className="modal-content">
            <h1 className="font-bold text-black-600">Edit Comment</h1>
            <h3 className="font-bold text-gray-600">@{c.author}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-20 p-2 border rounded-md"
            />
            <div className="flex justify-end mt-2">
              <button onClick={() => setModal(false)} className="mr-2">Cancel</button>
              <button onClick={() => editComment(c.commentid)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;