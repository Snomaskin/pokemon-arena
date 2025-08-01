"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBattle, type AttackAnimation } from "@/contexts/battleContext";
import { getProjectileColor } from "@/styles/getProjectileColor";


export default function AttackAnimationHandler() {
  const { attackAnimation, getCardRef, setAttackAnimation } = useBattle();
  const [projectile, setProjectile] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    moveType: string;
  } | null>(null);

  useEffect(() => {
    if (!attackAnimation) return;

    const animateAttack = async (attackerEl: HTMLElement, targetEl: HTMLElement, animation: AttackAnimation) => {
      const attackerRect = attackerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const startX = attackerRect.left + attackerRect.width  / 2;
      const startY = attackerRect.top + attackerRect.height / 2;
      const endX = targetRect.left + targetRect.width / 2;
      const endY = targetRect.top + targetRect.height / 2;

      setProjectile({
        startX,
        startY,
        endX,
        endY,
        moveType: animation.move.type || 'normal'
      });

      setTimeout(() => {
        setProjectile(null);
        setAttackAnimation(null);
      }, 1000);
    };

    const attackerRef = getCardRef(attackAnimation.attacker.pokemon, attackAnimation.attacker.team);
    const targetRef = getCardRef(attackAnimation.target.pokemon, attackAnimation.target.team);

    if (attackerRef?.current && targetRef?.current) {
      animateAttack(attackerRef.current, targetRef.current, attackAnimation);
    }
  }, [attackAnimation, setAttackAnimation, getCardRef]);

  return (
    <AnimatePresence>
      {projectile && (
        <motion.div
          className={`fixed w-4 h-4 rounded-full ${getProjectileColor(projectile.moveType)} shadow-lg z-50`}
          initial={{
            left: projectile.startX,
            top: projectile.startY,
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            left: projectile.endX,
            top: projectile.endY,
            scale: [0.5, 1.2, 0.8],
            opacity: [0, 1, 1, 0]
          }}
          exit={{
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            scale: {
              times: [0, 0.3, 0.7, 1],
              duration: 0.8
            }
          }}
          style={{
            boxShadow: "0 0 20px #6b7280"
          }}
        />
      )}
    </AnimatePresence>
  );
}