import { useContext } from "react"
import { WASMContext } from "../context/WASMContext"
import { Canvas } from "./Canvas"

export const CanvasSection = () => {
  const { wasm } = useContext(WASMContext)
  return (
    <section id='canvas-section' className='m-4 absolute inset-0 flex justify-center items-center'>
      {!wasm ? null : <Canvas wasm={wasm}/>}
    </section>
  )
}
