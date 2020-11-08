/** @format */

import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Dimensions,
  ScrollView,
  // Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const Header = ({scrollY}) => {
  const clampScroll = Animated.diffClamp(scrollY, 0, 50);

  const headerTranslateY = Animated.interpolate(clampScroll, {
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: 'clamp'
  })

  const headerHieght = Animated.interpolate(
    clampScroll,
    {
      inputRange: [0, 70],
      outputRange: [70, 0],
      extrapolate: 'clamp'
    }
  )

  const headerOpacity = Animated.interpolate(
    clampScroll,
    {
      inputRange: [0, 70],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    }
  );

	return (
		<SafeAreaView>
			<Animated.View style={[styles.header, {
        opacity: headerOpacity,
        height: headerHieght,
        transform: [{
          translateY: headerTranslateY
        }]
      }]}>
				<Text
					style={{ fontSize: 27, color: 'blue', fontWeight: 'bold' }}
				>
					Facebook
				</Text>
				<View style={styles.iconBox}>
					<FontAwesome
						name='search'
						size={20}
						color='#444'
					></FontAwesome>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
};

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<View style={[styles.container]}>
			<StatusBar hidden />
			<Header scrollY={scrollY}></Header>
			<Animated.ScrollView
				style={{ width, height }}
				showsVerticalScrollIndicator={false}
				bounces={false}
				scrollEventThrottle={3}
				onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
			>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
				<View style={[styles.fakePost]}></View>
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	safeAreaView: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		width: width,
    paddingVertical: 10,
    height: 70
	},
	scrollView: {
		flex: 1,
	},
	fakePost: {
		height: 250,
		marginHorizontal: 15,
		borderRadius: 16,
		backgroundColor: '#444',
		marginBottom: 20,
  },
  iconBox: {
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,.1)'
  }
});
