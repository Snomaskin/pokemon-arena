const getProjectileColor = (type: string) => {
    const animations = {
      fire: {
        projectile: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-orange-500",
        particle: "bg-orange-400",
        glow: "shadow-red-500/50",
        shape: "rounded-full",
        duration: 1.2,
        size: [8, 20, 12]
      },
      water: {
        projectile: "bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 text-blue-500",
        particle: "bg-blue-300",
        glow: "shadow-blue-500/50",
        shape: "rounded-full",
        duration: 1.0,
        size: [8, 16, 8]
      },
      electric: {
        projectile: "bg-gradient-to-r from-yellow-400 via-yellow-300 to-white text-yellow-400",
        particle: "bg-yellow-200",
        glow: "shadow-yellow-400/70",
        shape: "transform rotate-70 skew-x-50", 
        duration: 0.6, 
        size: [4, 40, 4] 
      },
      grass: {
        projectile: "bg-gradient-to-r from-green-600 via-green-400 to-green-300 text-green-500",
        particle: "bg-green-300",
        glow: "shadow-green-500/50",
        shape: "rounded-full",
        duration: 1.1,
        size: [8, 18, 10]
      },
      ice: {
        projectile: "bg-gradient-to-r from-cyan-400 via-blue-200 to-white text-white-300",
        particle: "bg-cyan-200",
        glow: "shadow-cyan-400/60",
        shape: "transform rotate-45",
        duration: 1.0,
        size: [8, 16, 8]
      },
      psychic: {
        projectile: "bg-gradient-to-r from-purple-500 via-pink-400 to-purple-300 text-pink-400",
        particle: "bg-pink-300",
        glow: "shadow-purple-500/60",
        shape: "rounded-full",
        duration: 1.3,
        size: [8, 22, 14]
      },
      dragon: {
        projectile: "bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-blue-300",
        particle: "bg-purple-400",
        glow: "shadow-indigo-500/60",
        shape: "rounded-full",
        duration: 1.4,
        size: [10, 24, 16]
      },
      dark: {
        projectile: "bg-gradient-to-r from-gray-800 via-purple-900 to-black text-black-200",
        particle: "bg-gray-600",
        glow: "shadow-purple-900/50",
        shape: "rounded-full",
        duration: 1.1,
        size: [8, 18, 10]
      },
      normal: {
        projectile: "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-gray 300",
        particle: "bg-gray-200",
        glow: "shadow-gray-400/40",
        shape: "rounded-full",
        duration: 1.0,
        size: [8, 16, 8]
      }
    };
    return animations[type as keyof typeof animations] || animations.normal;
  };

  export { getProjectileColor }