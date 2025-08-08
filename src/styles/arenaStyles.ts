const card = {
  team1: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-300 hover:border-blue-400",
    healthBar: "bg-blue-500",
    imageBg: "from-blue-100 to-blue-200"
  },
  team2: {
    bg: "bg-gradient-to-br from-red-50 to-red-100",
    border: "border-red-300 hover:border-red-400",
    healthBar: "bg-red-500",
    imageBg: "from-red-100 to-red-200"
  },
  isDefeated: {
    bg: "bg-gradient-to-br from-gray-200 to-gray-300",
    border: "border-gray-400",
    healthBar: "bg-gray-400",
    imageBg: "from-gray-300 to-gray-400",
    overlay: "bg-black bg-opacity-10",
    filter: "grayscale(100%) brightness(50%)"
  },
};

const moves = {
  team1:{
    bg: "bg-white/90 border-blue-300",
    border: "border-blue-300 hover:border-blue-400",
    text: "text-blue-800",
    hover: "hover:bg-blue-50",
    placement: "top-full mt-1 lg:mt-2 -translate-y-5/12",
  }, 
  team2:  {
    bg: "bg-white/90 border-red-300",
    border: "border-red-300 hover:border-red-400",
    text: "text-red-800",
    hover: "hover:bg-red-50",
    placement: "bottom-full mb-2 translate-y-2/6",
  }
};

export { card, moves }