import { Container } from "../../components"
import { useState } from "react"
function BgChanger() {
  const [color, setColor] = useState("")
  return (
<Container>
<div className='text-center text-white py-5 font-bold '>
  A Background Changer
</div>
<div className="w-full h-screen duration-200 rounded-3xl  border-indigo-300 ring-2 ring-offset-2 hover:ring-offset-4" 
style = {{backgroundColor: color}}>
  <div className=" flex flex-wrap justify-center bottom-24 px-20" >
    <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-3xl"
    >
      <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-gradient-to-r from-blue-500 to-green-500" onClick={()=>setColor("black")}>black</button>
      <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-gradient-to-r from-blue-500 to-green-500" onClick={()=>setColor("beige")}>beige</button>
      <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-gradient-to-r from-blue-500 to-green-500" onClick={()=>setColor("white")}>white</button>
      <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg bg-gradient-to-r from-blue-500 to-green-500" style={{backgroundColor:"lavender"}}onClick={()=>setColor("lavender")}>lavender</button>
    </div>
  </div>
</div>

</Container>
  )
}

export default BgChanger;