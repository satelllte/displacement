import { useContext } from "react"
import { WASMContext } from "../context/WASMContext"
import { Canvas } from "./Canvas"

export const CanvasSection = () => {
  const { wasm } = useContext(WASMContext)
  return (
    <section id='canvas-section' className='m-4 absolute inset-0 flex justify-center items-center'>
      <div className='relative w-full h-full max-w-[500px] max-h-[500px] flex justify-center items-center'>
        {/* {!wasm ? null : <Canvas wasm={wasm}/>} */}
      </div>
    </section>
  )
}
