import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import StepsCarousel from './StepsCarousel/StepsCarousel';
import { useDispatch } from 'react-redux';
import { getUserExperience } from '../../store/actions/kyc';
import Steps from './Steps/Steps';

const FirstInvestmentStepsScreen = () => {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(getUserExperience());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StepsCarousel step={currentStep} />
        <Steps step={currentStep} setCurrentStep={setCurrentStep} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});

export default FirstInvestmentStepsScreen;
