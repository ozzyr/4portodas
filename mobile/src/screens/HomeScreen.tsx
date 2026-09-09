import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'report' | 'protocol' | 'emergency') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Safety Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>🛡️ Espaço de Escuta & Proteção Escolar</Text>
      </View>

      {/* Hero Title */}
      <Text style={styles.title}>
        A culpa <Text style={styles.titleHighlight}>nunca</Text> é sua.
      </Text>
      <Text style={styles.subtitle}>
        Canal seguro e confidencial para alunas relatarem assédio ou intimidação.
      </Text>

      {/* Mascot Card */}
      <View style={styles.mascotCard}>
        <Text style={styles.mascotEmoji}>🌸</Text>
        <Text style={styles.mascotText}>
          "Olá! Estou aqui para te garantir que você será ouvida com todo carinho, respeito e sigilo absoluto."
        </Text>
      </View>

      {/* Main Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => onNavigate('report')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>✨ Fazer um Relato Seguro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => onNavigate('emergency')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSecondaryText}>📞 Canais de Ajuda Imediata (180 / 100)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSubtle}
          onPress={() => onNavigate('protocol')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSubtleText}>🔍 Acompanhar Meu Protocolo</Text>
        </TouchableOpacity>
      </View>

      {/* Guarantees Box */}
      <View style={styles.guaranteeBox}>
        <Text style={styles.guaranteeItem}>✓ Opção 100% Anônima</Text>
        <Text style={styles.guaranteeItem}>✓ Sigilo Absoluto (LGPD)</Text>
        <Text style={styles.guaranteeItem}>✓ Respaldo da Lei 14.811/2024 e ECA</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.pageBg
  },
  badge: {
    backgroundColor: Colors.pink100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16
  },
  badgeText: {
    color: Colors.pink800,
    fontWeight: '700',
    fontSize: 12
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.neutral900,
    textAlign: 'center',
    marginBottom: 8
  },
  titleHighlight: {
    color: Colors.pink500,
    textDecorationLine: 'underline'
  },
  subtitle: {
    fontSize: 15,
    color: Colors.neutral600,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22
  },
  mascotCard: {
    width: '100%',
    backgroundColor: Colors.pink50,
    borderColor: Colors.pink200,
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  mascotEmoji: {
    fontSize: 32
  },
  mascotText: {
    flex: 1,
    color: Colors.pink900,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500'
  },
  actionContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24
  },
  btnPrimary: {
    backgroundColor: Colors.pink500,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.pink500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  btnSecondary: {
    backgroundColor: Colors.violet50,
    borderColor: Colors.violet500,
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  btnSecondaryText: {
    color: Colors.violet800,
    fontSize: 14,
    fontWeight: '700'
  },
  btnSubtle: {
    paddingVertical: 12,
    alignItems: 'center'
  },
  btnSubtleText: {
    color: Colors.neutral700,
    fontSize: 14,
    fontWeight: '600'
  },
  guaranteeBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutral200,
    gap: 6
  },
  guaranteeItem: {
    fontSize: 13,
    color: Colors.neutral700,
    fontWeight: '600'
  }
});
