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
  }
};

const moves = {
  team1:{
    bg: "bg-white/90 border-blue-300",
    border: "border-blue-300 hover:border-blue-400",
    text: "text-blue-800",
    hover: "hover:bg-blue-50",
    placement: "top-full mt-2",
  }, 
  team2:  {
    bg: "bg-white/90 border-red-300",
    border: "border-red-300 hover:border-red-400",
    text: "text-red-800",
    hover: "hover:bg-red-50",
    placement: "bottom-full mb-2",
  }
};

export { card, moves }