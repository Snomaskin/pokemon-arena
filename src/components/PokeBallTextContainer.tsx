export default function PokeBallTextContainer({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center scale-70 lg:scale-none">
      <div className="group relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-black shadow-lg font-bold overflow-hidden flex-shrink-0 hover:-translate-y-0.5 transition-hover duration-100">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 group-hover:bg-red-600 " />

        <div className="absolute top-1/2 w-full h-1 border-t-4 border-black" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-4 border-black group-hover:bg-gray-100">

        <span className="relative text-m text-black z-20 skew-y-2 p-1">{text}</span>
        </div>
      </div>
    </div>
  )
}