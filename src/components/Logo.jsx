/* eslint-disable react/prop-types */

function Logo({width='50px'}) {
  return (
    <div>
      <img src="/public/BlogIcon.png" alt="" width={width} className="rounded-3xl border-3 border-blue-400"/>
    </div>
  )
}

export default Logo