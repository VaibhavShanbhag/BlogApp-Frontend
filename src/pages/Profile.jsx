import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { message } from "antd"


const Profile = () => {
  const param = useParams().id
  const [username, setUsername] = useState("")
  const [emailid, setEmail] = useState("")
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [updated, setUpdated] = useState(false)
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user.username)
      setUsername(res.data.username)
      setEmail(res.data.email)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUserUpdate = async () => {
    setUpdated(false)
    try {
      const res = await axios.put(URL + "/api/users/" + user.userid, { username, emailid: emailid }, { withCredentials: true })
      console.log(res.data)
      setUpdated(true)
      message.success("User Updated Successfully")

    }
    catch (err) {
      console.log(err)
      setUpdated(false)
      message.error("Something went wrong while updating")
    }

  }

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user.username, { withCredentials: true })

      setUser(null)
      navigate("/")
      message.success("User deleted successfully")
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
      message.error("Something went wrong while deleting")
    }
  }
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user.userid)
      // console.log(res.data)
      setPosts(res.data)


    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()

  }, [param])

  useEffect(() => {
    fetchUserPosts()

  }, [param])

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          {posts.length == 0 ? <h1 className="text-xl font-bold mb-4">No Posts Found</h1> : <h1 className="text-xl font-bold mb-4">Your posts:</h1>}
          {posts?.map((p) => (
            <ProfilePosts key={p.postid} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input onChange={(e) => setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text" readonly="readonly" />
            <input onChange={(e) => setEmail(e.target.value)} value={emailid} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email" />
            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
              <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
            </div>
            {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile