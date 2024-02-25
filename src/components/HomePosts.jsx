/* eslint-disable react/prop-types */


const HomePosts = ({post}) => {
  const timestampString = post.timestamp;
  const date = new Date(timestampString.replace(/(\d{4})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})\.(\d{2})/, '$1-$2-$3T$4:$5:$6'));
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src={post.photo} alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
      {post.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       <p>@{post.username}</p>
       <div className="flex space-x-1.5 text-sm">
       <p>{dateString}</p>
       <p>{timeString}</p>
       </div>
      </div>
      <p className="text-sm md:text-lg">{post.des.slice(0,200)+" ...Read more"}</p>
    </div>

    </div>
  )
}

export default HomePosts

