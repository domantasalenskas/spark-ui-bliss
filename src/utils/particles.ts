import type { Engine } from "@tsparticles/engine";

export async function initParticlesEngine(callback: (engine: Engine) => Promise<void>): Promise<void> {
  const { tsParticles } = await import("@tsparticles/engine");
  await callback(tsParticles);
}