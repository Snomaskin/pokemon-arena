const selectionStyles = {
  team1: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-200",
    shadow: "shadow-blue-100",
    itemBg: "bg-blue-50",
    itemHoverBg: "hover:bg-blue-200 hover:shadow-blue-200",
    title: "text-blue-800",
    subtitle: "text-blue-600"
  },
  team2: {
    bg: "bg-gradient-to-br from-red-50 to-red-100", 
    border: "border-red-200",
    shadow: "shadow-red-100",
    itemBg: "bg-red-50",
    itemHoverBg: "hover:bg-red-200 hover:shadow-red-200",
    title: "text-red-800",
    subtitle: "text-red-600"
  }
};

const cardStyles = {
  team1: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-300",
    stagingBg: "bg-blue-100",
    headerBg: "bg-blue-200",
    buttonBg: "bg-blue-500 hover:bg-blue-600",
    buttonText: "text-white",
    accent: "text-blue-800",
    closeHover: "hover:bg-blue-100"
  },
  team2: {
    bg: "bg-gradient-to-br from-red-50 to-red-100",
    border: "border-red-300", 
    stagingBg: "bg-red-100",
    headerBg: "bg-red-200",
    buttonBg: "bg-red-500 hover:bg-red-600",
    buttonText: "text-white",
    accent: "text-red-800",
    closeHover: "hover:bg-red-100"
  }
};

const stagingStyles = {
  team1: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    titleText: "text-blue-800",
    baseText: "text-blue-600",
    altText: "text-blue-400",
  },
    team2: {
    bg: "bg-red-100",
    border: "border-red-300",
    titleText: "text-red-800",
    baseText: "text-red-600",
    altText: "text-red-400",
  }
};

const stagingListStyles = {
  team1: {
    border: "border-blue-200",
    borderHover: "hover:border-blue-300",
    buttonBg: "bg-blue-500",
    buttonHoverBg: "hover:bg-blue-600",
    emptySlotBg: "border-blue-200",
    emptySlotInnerBg: "bg-blue-100",
    text: "text-blue-400",
  },
  team2: {
    border: "border-red-200",
    borderHover: "hover:border-red-300",
    buttonBg: "bg-red-500",
    buttonHoverBg: "hover:bg-red-600",
    emptySlotBg: "border-red-200",
    emptySlotInnerBg: "bg-red-100",
    text: "text-red-400",
  }
};

export { selectionStyles, cardStyles, stagingStyles, stagingListStyles }