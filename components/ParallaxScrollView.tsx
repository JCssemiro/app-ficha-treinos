import type { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, ViewStyle, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';


type Props = {
  children : React.ReactNode,
  style?: StyleProp<ViewStyle>
};

export default function ParallaxScrollView({
  children, style
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={style ? style : styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop:50,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
