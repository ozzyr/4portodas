import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Linking } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ReportScreen } from './src/screens/ReportScreen';
import { ProtocolScreen } from './src/screens/ProtocolScreen';
import { EmergencyScreen } from './src/screens/EmergencyScreen';
import { Colors } from './src/theme/colors';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'report' | 'protocol' | 'emergency'>('home');

  const handleQuickExit = () => {
    // Abre imediatamente o app padrão do Google ou site neutro para camuflar
    Linking.openURL('https://www.google.com.br');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.pink50} />

      {/* Top Safety Bar */}
      <View style={styles.safetyHeader}>
        <View style={styles.safetyInfo}>
          <View style={styles.safetyPulse} />
          <Text style={styles.safetyText}>Ambiente Protegido • Lei 14.811/2024</Text>
        </View>
        <TouchableOpacity
          style={styles.quickExitBtn}
          onPress={handleQuickExit}
          activeOpacity={0.7}
        >
          <Text style={styles.quickExitText}>✕ Sair Rápido</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Routing */}
      <View style={styles.screenContainer}>
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'report' && <ReportScreen onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'protocol' && <ProtocolScreen onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'emergency' && <EmergencyScreen onBack={() => setCurrentScreen('home')} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.pageBg
  },
  safetyHeader: {
    backgroundColor: Colors.pink50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pink200,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  safetyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  safetyPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.pink500
  },
  safetyText: {
    fontSize: 11,
    color: Colors.pink800,
    fontWeight: '700'
  },
  quickExitBtn: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6
  },
  quickExitText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800'
  },
  screenContainer: {
    flex: 1
  }
});
