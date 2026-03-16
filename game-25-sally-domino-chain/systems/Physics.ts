import Matter from 'matter-js';

export const Physics = (entities: any, { time }: any) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};
