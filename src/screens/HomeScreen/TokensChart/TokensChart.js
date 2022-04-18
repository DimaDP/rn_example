import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import {
  Area,
  Chart,
  HorizontalAxis,
  Line,
  Tooltip,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import TextLight from '../../../components/TextWrappers/TextLight';
import TokenIcon from '../../../assets/icons/token_placeholder.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import { useSelector } from 'react-redux';
import { formatDateForAxis } from '../../../utils/date';
import TextRegular from '../../../components/TextWrappers/TextRegular';

const screenWidth = Dimensions.get('window').width;
const containerHeight = screenWidth * 0.7;

const TokensChart = () => {
  const graph = useSelector(store => store.graph.graph);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.heading}>
          <TextLight style={styles.headingText}>Available Tokens</TextLight>
          <View style={styles.tokens}>
            <View style={styles.token}>
              <TokenIcon width={13} height={17} />
              <TextBold style={styles.tokensText}> 1 326</TextBold>
            </View>
          </View>
        </View>
        {graph && (
          <Chart
            style={styles.chart}
            data={graph[0].graphValues}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: graph[0].minDate, max: graph[0].maxDate }}
            yDomain={{ min: 0, max: graph[0].maxPrice }}>
            <VerticalAxis
              tickCount={4}
              theme={{
                labels: {
                  visible: true,
                  formatter: v => (v === 0 ? '0' : `${(v / 1000).toFixed()}k`),
                  label: {
                    color: COLORS.darkTextColor,
                    fontSize: 10,
                    fontWeight: 400,
                    textAnchor: 'end',
                    opacity: 1,
                    dx: -14,
                    dy: 4,
                    rotation: 0,
                    fontFamily: 'Poppins-Regular',
                  },
                },
                grid: {
                  visible: true,
                  stroke: {
                    color: '#BCC3D6',
                    width: 0.5,
                    opacity: 0.5,
                    dashArray: [],
                  },
                },
                ticks: {
                  visible: false,
                  stroke: {
                    color: 'transparent',
                    width: 1,
                    opacity: 1,
                  },
                },
                axis: { visible: false },
              }}
            />
            <HorizontalAxis
              tickCount={4}
              theme={{
                labels: {
                  formatter: v => '',
                  label: {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 300,
                    textAnchor: 'end',
                    opacity: 1,
                    dx: 4,
                    dy: -18,
                    rotation: 0,
                  },
                },
                stroke: {
                  color: '#BCC3D6',
                  width: 1,
                  opacity: 1,
                  dashArray: [],
                },
                grid: {
                  visible: false,
                  stroke: {
                    color: '#BCC3D6',
                    width: 1,
                    opacity: 1,
                    dashArray: [],
                  },
                },
                axis: { visible: false },
                ticks: {
                  visible: false,
                },
              }}
            />
            <Area
              theme={{
                gradient: {
                  // from: { color: '#988080', opacity: 0.3 },
                  // to: { color: '#2a3143', opacity: 0.2 },
                  from: { color: `#${graph[0].areaColor}`.from, opacity: 0.3 },
                  to: { color: `#${graph[0].areaColor}`.to, opacity: 0.2 },
                },
              }}
            />
            <Line
              theme={{
                stroke: { color: `#${graph[0].strokeColor}`, width: 1 },
              }}
              tooltipComponent={<Tooltip />}
            />
          </Chart>
        )}
        <View style={styles.xAxisLabels}>
          {graph &&
            graph[0].graphValues.map((item, idx) => {
              if (idx !== 0 && idx !== graph[0].graphValues.length - 1) {
                return (
                  <TextRegular style={styles.label} key={item.x}>
                    {formatDateForAxis(item.x)}
                  </TextRegular>
                );
              } else {
                return null;
              }
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: containerHeight,
    padding: 16,
  },
  chartContainer: {
    backgroundColor: COLORS.inputBackground,
    flex: 1,
    borderRadius: 8,
    paddingVertical: 16,
  },
  chart: {
    flex: 1,
  },
  heading: {
    paddingLeft: 16,
  },
  headingText: {
    color: COLORS.darkTextColor,
    fontSize: 13,
    marginBottom: 10,
  },
  tokens: {
    flexDirection: 'row',
  },
  token: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokensText: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 5,
  },
  xAxisLabels: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.inputBackground,
    height: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: 10,
    color: COLORS.darkTextColor,
  },
});

export default TokensChart;
