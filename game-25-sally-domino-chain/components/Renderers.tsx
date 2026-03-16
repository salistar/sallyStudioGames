import Matter from 'matter-js';
import { View, StyleSheet } from 'react-native';

export const Domino = (props: any) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color || '#fff',
        borderRadius: 2,
        transform: [{ rotate: `${props.body.angle}rad` }],
        borderWidth: 1,
        borderColor: '#000',
      }}
    />
  );
};

export const Floor = (props: any) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: '#333',
      }}
    />
  );
};
