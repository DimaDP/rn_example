import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InvestmentData from './InvestmentData';
import Expertise from './Expertise';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const Steps = ({ step, setCurrentStep }) => {
  const [amount, setAmount] = useState('1.000');
  return (
    <View style={styles.container}>
      <View horizontal style={{ flex: 1 }}>
        {step === 1 && (
          <InvestmentData
            setCurrentStep={setCurrentStep}
            amount={amount}
            setAmount={setAmount}
          />
        )}
        {step === 2 && (
          <Expertise setCurrentStep={setCurrentStep} amount={amount} />
        )}
        {step === 3 && <Step3 setCurrentStep={setCurrentStep} />}
        {step === 4 && <Step4 setCurrentStep={setCurrentStep} />}
        {step === 5 && <Step5 setCurrentStep={setCurrentStep} />}
        {step === 6 && <Step6 setCurrentStep={setCurrentStep} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Steps;
