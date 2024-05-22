import { useCallback, useEffect, useRef, useState } from "react"
function PassGen() {
  const [length,setLength]= useState(8)
  const [nosall,setnosall]=useState(false);
  const [pass,setPass]=useState("")
  const [charall,setcharall]=useState(false);
  const passref = useRef(null)
  
  const copypasstoclip= useCallback(()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0,101);
    // passref.current?.classList.add("text-yellow-300")
    window.navigator.clipboard.writeText(pass)
  },[pass])

  const passgen = useCallback(()=>{
    let pass =""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (nosall) str+="1234567890"
    if(charall) str+="!@#$%^&*()_+-=~`"
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)
   
    }
    setPass(pass)
  },[length,nosall,charall,setPass])
  useEffect(()=>{passgen()},[length,nosall,charall,passgen])


  return (
    <>
    <div className='text-center text-white py-5 font-bold '>
  A Password Generator
</div>
    <div className=" w-full max-w-md text-center mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-black bg-slate-400">
    <h1 className='text-3xl text-center py-2 px-2'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value ={pass}
        className="outline-none w-full py-1 px-3" placeholder="passs" readOnly
        ref={passref} />    
        <button className="outline-slate-950 bg-slate-700 text-white 
        transition-transform duration-300 transform hover:scale-105  active:bg-black  active:scale-125 
        px-3 py-0.5 shrink-0 "onClick={copypasstoclip}> copy</button>
      </div> 
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
                  min={6}
                  max={100}
                  value={length}
                  className="cursor-pointer"
                  onChange={(e)=>{setLength(e.target.value)}}
          />
          <label > Length: {length}</label>
        </div>
        <div className =" flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={nosall} id="nosinput"
          onChange={()=>setnosall((prev)=>!prev)} />
          <label> Nos</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charall} id="charinput"
          onChange={()=>setcharall((prev)=>!prev)} />
          <label> Chars</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default PassGen
