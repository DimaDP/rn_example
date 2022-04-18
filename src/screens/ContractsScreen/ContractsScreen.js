import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import styles from './ContractScreenStyles';
import DocIcon from '../../assets/icons/document.svg';
import TextRegular from '../../components/TextWrappers/TextRegular';
import TextBold from '../../components/TextWrappers/TextBold';

const documents = [...Array(4).keys()];

const ContractsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInner}>
        {documents.map(document => {
          return (
            <View style={styles.document}>
              <View style={styles.iconWrapper}>
                <DocIcon />
              </View>
              <View style={styles.infoWrapper}>
                <View style={styles.infoRow}>
                  <View style={styles.firstColumn}>
                    <TextRegular style={styles.text}>contract id: </TextRegular>
                    <TextBold style={styles.textBold}>32587945</TextBold>
                  </View>
                  <View style={styles.secondColumn}>
                    <TextRegular style={styles.text}>Feb 1, 2021</TextRegular>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.firstColumn}>
                    <TextRegular style={styles.text}>Object:: </TextRegular>
                    <TextBold style={styles.textBold}>
                      House {document}
                    </TextBold>
                  </View>
                  <View style={styles.secondColumn}>
                    <TextRegular style={styles.text}>04:36</TextRegular>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContractsScreen;
