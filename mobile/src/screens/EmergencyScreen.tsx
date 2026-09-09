import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Colors } from '../theme/colors';

interface EmergencyScreenProps {
  onBack: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ onBack }) => {
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Canais de Emergência</Text>
      <Text style={styles.subtitle}>Linhas gratuitas e 24h para proteção e denúncia.</Text>

      {/* Disque 180 */}
      <View style={[styles.card, styles.pinkCard]}>
        <Text style={styles.cardTitle}>Disque 180</Text>
        <Text style={styles.cardDesc}>Central de Atendimento à Mulher</Text>
        <TouchableOpacity style={styles.btnCallPink} onPress={() => handleCall('180')}>
          <Text style={styles.btnCallText}>Ligar 180 (Gratuito)</Text>
        </TouchableOpacity>
      </View>

      {/* Disque 100 */}
      <View style={[styles.card, styles.violetCard]}>
        <Text style={styles.cardTitle}>Disque 100</Text>
        <Text style={styles.cardDesc}>Direitos Humanos & Proteção Infantojuvenil (ECA)</Text>
        <TouchableOpacity style={styles.btnCallViolet} onPress={() => handleCall('100')}>
          <Text style={styles.btnCallText}>Ligar 100 (Gratuito)</Text>
        </TouchableOpacity>
      </View>

      {/* Polícia Militar 190 */}
      <View style={[styles.card, styles.neutralCard]}>
        <Text style={styles.cardTitle}>Ligue 190</Text>
        <Text style={styles.cardDesc}>Polícia Militar (Risco Imediato)</Text>
        <TouchableOpacity style={styles.btnCallNeutral} onPress={() => handleCall('190')}>
          <Text style={styles.btnCallText}>Ligar 190</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.pageBg
  },
  backBtn: {
    marginBottom: 12
  },
  backBtnText: {
    color: Colors.pink600,
    fontWeight: '700',
    fontSize: 14
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.neutral900,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 13,
    color: Colors.neutral600,
    marginBottom: 20
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1.5
  },
  pinkCard: {
    backgroundColor: Colors.pink50,
    borderColor: Colors.pink200
  },
  violetCard: {
    backgroundColor: Colors.violet50,
    borderColor: Colors.violet200
  },
  neutralCard: {
    backgroundColor: '#fff',
    borderColor: Colors.neutral300
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.neutral900,
    marginBottom: 4
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.neutral600,
    marginBottom: 12
  },
  btnCallPink: {
    backgroundColor: Colors.pink500,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnCallViolet: {
    backgroundColor: Colors.violet500,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnCallNeutral: {
    backgroundColor: Colors.neutral800,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnCallText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14
  }
});
