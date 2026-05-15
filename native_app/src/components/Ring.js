import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T } from '@/theme';

export default function Ring({ pct, col, size = 100, trk = "#DEE4ED", w = 10 }) {
  const r = (size - w) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size}>
        <Circle 
          cx={c} 
          cy={c} 
          r={r} 
          fill="none" 
          stroke={trk} 
          strokeWidth={w} 
        />
        <Circle 
          cx={c} 
          cy={c} 
          r={r} 
          fill="none" 
          stroke={col} 
          strokeWidth={w} 
          strokeDasharray={circ} 
          strokeDashoffset={offset} 
          strokeLinecap="round" 
          transform={`rotate(-90 ${c} ${c})`}
        />
      </Svg>
      <View style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontFamily: 'Nunito',
          fontWeight: '900',
          fontSize: size / 3.5,
          color: T.n900,
          marginTop: 2
        }}>{pct}</Text>
      </View>
    </View>
  );
}
