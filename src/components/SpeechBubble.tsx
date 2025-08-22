interface Props {
  text: string;
  arrowRight: boolean;
  pulseText?: boolean;
}

export default function SpeechBubble({ text, arrowRight, pulseText = false }: Props) {
  return (
    <div className={`flex absolute bg-white min-w-35 min-h-18 transform ${arrowRight ? "translate-x-2/6 sm:translate-x-4/6" : "-translate-x-2/6 sm:-translate-x-4/6"} -translate-y-[2rem] sm:-translate-y-[6rem] justify-center items-center rounded-2xl z-100 shadow-2xl scale-75 sm:scale-none`}>
      <span className={`font-bold text-black text-lg ${pulseText && "animate-pulse"}`}>
        {text}
      </span>
      <div className={`absolute -bottom-2 ${arrowRight ? "rotate-20 left-0" : "-rotate-20 right-0"} border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-white shadow-2xl`} />
    </div>
  )
}