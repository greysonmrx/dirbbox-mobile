import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Container, DoughnutContainer, WhiteCircle } from './styles';

interface DoughnutProps {
  data: number[];
}

const { width } = Dimensions.get('window');

const Doughnut: React.FC<DoughnutProps> = ({ data }) => {

  const chartConfig = {
    backgroundGradientFrom: '#1E2924',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const chartData = [
    {
      population: data[0],
      color: '#22215B'
    }, {
      population: data[1],
      color: '#FFC700'
    }, {
      population: data[2],
      color: '#4CE364'
    }, {
      population: data[3],
      color: '#567DF4'
    }
  ]

  return (
    <Container>
      <DoughnutContainer>
        <PieChart 
          data={chartData}
          width={width}
          height={width / 2}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          hasLegend={false}
          paddingLeft={String(width / 4)}
        />
      </DoughnutContainer>      
    <WhiteCircle />
    </Container>
  );
}

export default Doughnut;