import { useContext } from "react"
import { WASMContext } from "../context/WASM"

export const WASMExample = () => {
  const ctx = useContext(WASMContext)

  if (!ctx.wasm) {
    return <>...</>
  }

  return <p className='text-center text-md sm:text-lg lg:text-xl'>Computed from WASM: 4+3={ctx.wasm.add(4,3)}</p>
}
