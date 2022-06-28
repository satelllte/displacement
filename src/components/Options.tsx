import { RenderAction } from './RenderAction'

export const Options = () => {
  return (
    <div className='absolute inset-4 flex flex-col justify-between'>
      <h2 className='mb-8 text-xl'>Options</h2>
      <RenderAction/>
    </div>
  )
}
