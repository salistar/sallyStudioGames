import Matter from 'matter-js';

export const Physics = (entities: any, { time, touches }: any) => {
  let engine = entities.physics.engine;

  touches.filter((t: any) => t.type === "press").forEach((t: any) => {
    // On pourrait ajouter une force ici si on voulait une interaction directe
  });

  Matter.Engine.update(engine, time.delta);
  return entities;
};
