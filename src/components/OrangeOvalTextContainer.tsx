export default function OrangeOvalTextContainer({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg lg:text-xl px-4  py-2 lg:py-3 rounded-full shadow-lg transform group-hover:rotate-12 border-2 border-yellow-300">
        {text}
      </div>
    </div>
  )
}