import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './ScreenView.styles';

export const ScreenView = ({
	children,
	style,
	contentContainerStyle,
	...otherProps
}) => {
	return (
		<ScrollView
			style={{ ...styles.container, ...style }}
			contentContainerStyle={{
				...styles.content,
				...contentContainerStyle,
			}}
			{...otherProps}
		>
			{children}
		</ScrollView>
	);
};
