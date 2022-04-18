// import React, { useEffect, useRef } from 'react';
// import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
// import { COLORS } from '../../../constants/colors';
// import TextRegular from '../../../components/TextWrappers/TextRegular';
// import TextBold from '../../../components/TextWrappers/TextBold';
// import TokenIcon from '../../../assets/icons/token_placeholder.svg';
//
// const screenWidth = Dimensions.get('window').width;
// const containerHeight = screenWidth * 0.8;
// const chartHeight = screenWidth * 0.3;
// // const chartHeight = 100;
// const onLayout = event => {
//   const { x, y, height, width } = event.nativeEvent.layout;
//   console.log('from element', height, width);
// };
//
// console.log(chartHeight);
//
// const Bar = ({ width, height, idx }) => {
//   return (
//     <View style={[styles.bar, { width, height }]}>
//       <Text>{idx + 1}</Text>
//     </View>
//   );
// };
//
// const array = [...Array(7).keys()];
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
//
// const DashboardChat = () => {
//   const scrollRef = useRef(null);
//
//   useEffect(() => {
//     scrollRef.current.scrollToEnd();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <View style={styles.chartContainer}>
//         <TextRegular style={styles.balance}>Available balance:</TextRegular>
//         <View style={styles.row}>
//           <TokenIcon width={16} height={21} />
//           <TextBold style={styles.balanceValue}>1456</TextBold>
//         </View>
//         <ScrollView
//           onLayout={onLayout}
//           horizontal
//           style={styles.chart}
//           ref={scrollRef}
//           contentContainerStyle={{
//             height: chartHeight,
//             width: '100%',
//             justifyContent: 'space-between',
//           }}>
//           <View style={[styles.lineH]} />
//           <View style={[styles.lineH, { top: chartHeight / 3 }]} />
//           <View style={[styles.lineH, { top: (chartHeight / 3) * 2 }]} />
//           {array.map((item, index) => {
//             return (
//               <Bar
//                 key={index}
//                 height={getRandomInt(99)}
//                 width={25}
//                 idx={index}
//               />
//             );
//           })}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth,
//     height: containerHeight,
//     paddingHorizontal: 16,
//   },
//   chartContainer: {
//     backgroundColor: COLORS.inputBackground,
//     borderRadius: 8,
//     padding: 32,
//     paddingTop: 16,
//     paddingRight: 16,
//   },
//   chart: {
//     borderLeftWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: COLORS.darkTextColor,
//     height: chartHeight,
//   },
//   lineH: {
//     backgroundColor: COLORS.darkTextColor,
//     height: 0.5,
//     opacity: 0.5,
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//   },
//   bar: {
//     backgroundColor: COLORS.positiveSum,
//     marginHorizontal: 6,
//     alignSelf: 'flex-end',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   balance: {
//     color: COLORS.darkTextColor,
//     fontSize: 13,
//   },
//   balanceValue: {
//     color: COLORS.white,
//     fontSize: 22,
//     marginLeft: 8,
//   },
// });
//
// export default DashboardChat;
