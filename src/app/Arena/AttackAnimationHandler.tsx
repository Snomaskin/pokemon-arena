"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBattle, type AttackAnimationData } from "@/contexts/battleContext";
import { getProjectileColor } from "@/styles/getProjectileColor";
import { randomInRange } from "@/utils/randomNumbers";


interface Projectile {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  moveType: string;
  moveName?: string;
  particles: {
    id: number;
    delay: number;
    offset: number;
    size: number;
  }[];
};

export default function AttackAnimationDataHandler() {
  const { attackAnimationData, getCardRef, setAttackAnimationData } = useBattle();
  const [projectile, setProjectile] = useState<Projectile | null>(null);

  const createParticles = (moveType: string, count: number = 100) => {
    const particleCount = moveType === 'electric' ? 40 : count;
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: randomInRange(0, 0.3),
      offset: randomInRange(-10, 10),
      size: randomInRange(4, 12),
    }));
  };

  useEffect(() => {
    if (!attackAnimationData) return;

    const animateAttack = async (attackerEl: HTMLElement, targetEl: HTMLElement, animation: AttackAnimationData) => {
      const attackerRect = attackerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const startX = attackerRect.left + attackerRect.width / 2;
      const startY = attackerRect.top + attackerRect.height / 2;
      const endX = targetRect.left + targetRect.width / 2;
      const endY = targetRect.top + targetRect.height / 2;

      const moveType = animation.move.type;
      const style = getProjectileColor(moveType);

      setProjectile({
        startX,
        startY,
        endX,
        endY,
        moveType,
        moveName: animation.move.name,
        particles: createParticles(moveType)
      });

      setTimeout(() => {
        setProjectile(null);
        setAttackAnimationData(null);
      }, style.duration * 1000 + 500);
    };

    const attackerRef = getCardRef(attackAnimationData.attacker.pokemon, attackAnimationData.attacker.team);
    const targetRef = getCardRef(attackAnimationData.target.pokemon, attackAnimationData.target.team);

    if (attackerRef?.current && targetRef?.current) {
      animateAttack(attackerRef.current, targetRef.current, attackAnimationData);
    }
  }, [attackAnimationData, setAttackAnimationData, getCardRef]);

  return (
    <AnimatePresence>
      {projectile && (
        <TypeSpecificAnimation projectile={projectile} />
      )}
    </AnimatePresence>
  );
}


const TypeSpecificAnimation = ({ projectile }: { projectile: Projectile }) => {
    const style = getProjectileColor(projectile.moveType);
    
    return (
      <>
        {/* Main projectile */}
        <motion.div
          className={`fixed ${style.projectile} ${style.shape} ${style.glow} z-[220]`}
          initial={{
            left: projectile.startX,
            top: projectile.startY,
          }}
          animate={{
            left: projectile.endX,
            top: projectile.endY,
            width: style.size,
            height: style.size,
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: style.duration,
            ease: "easeOut"
          }}
          style={{
            boxShadow: "0 0 30px currentColor",
            filter: "brightness(1.2)"
          }}
        />

        {/* Particles */}
        {projectile.particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`fixed ${style.particle} rounded-full z-[220]`}
            initial={{
              left: projectile.startX + particle.offset,
              top: projectile.startY + particle.offset,
              width: particle.size,
              height: particle.size,
              opacity: 0
            }}
            animate={{
              left: projectile.endX + particle.offset * 2,
              top: projectile.endY + particle.offset * 1.5,
              opacity: [0, 0.8, 0.4, 0],
              scale: projectile.moveType === 'electric' ? [0.5, 1.5, 0.2] : [0.8, 1.2, 0.3]
            }}
            transition={{
              duration: style.duration * 0.8,
              delay: particle.delay,
              ease: "easeOut"
            }}
            style={{
              filter: projectile.moveType === 'electric' ? 'brightness(1.5)' : 'none',
              boxShadow: "0 0 30px currentColor",

            }}
          />
        ))}

        {/* Impact */}
        <motion.div
          className={`fixed ${style.projectile} rounded-full z-[210]`}
          initial={{
            left: projectile.endX - 10,
            top: projectile.endY - 10,
          }}
          animate={{
            width: [20, 60, 0],
            height: [20, 60, 0],
            opacity: [0, 0, 1, 0]
          }}
          transition={{
            duration: 0.8,
            delay: style.duration * 0.7,
            ease: "easeOut"
          }}
          style={{
            boxShadow: '0 0 40px currentColor'
          }}
        />
      </>
    );
  };