import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { MobileApi } from '../services/api';

interface ProtocolScreenProps {
  onBack: () => void;
}

export const ProtocolScreen: React.FC<ProtocolScreenProps> = ({ onBack }) => {
  const [protocolInput, setProtocolInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!protocolInput.trim()) return;
    setLoading(true);
    setSearched(true);
    const data = await MobileApi.trackProtocol(protocolInput.trim());
    setLoading(false);
    setResult(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Acompanhar Protocolo</Text>
      <Text style={styles.subtitle}>Verifique o andamento do acolhimento escolar usando seu código confidencial.</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={protocolInput}
          onChangeText={setProtocolInput}
          placeholder="Ex: 4PT-7821-S"
          placeholderTextColor={Colors.neutral500}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.btnSearch} onPress={handleSearch} disabled={loading}>
          <Text style={styles.btnSearchText}>{loading ? '...' : 'Buscar'}</Text>
        </TouchableOpacity>
      </View>

      {searched && !result && !loading && (
        <View style={styles.notFoundCard}>
          <Text style={styles.notFoundText}>⚠️ Protocolo não localizado. Verifique se digitou o código completo.</Text>
        </View>
      )}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.headerRow}>
            <Text style={styles.codeText}>{result.id}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{result.status}</Text>
            </View>
          </View>

          <Text style={styles.metaText}>Tipo: {result.type}</Text>
          <Text style={styles.metaText}>Data: {result.date}</Text>

          <View style={styles.divider} />

          <Text style={styles.historyTitle}>Histórico do Comitê de Proteção:</Text>
          {result.notesSummary && result.notesSummary.map((n: any, i: number) => (
            <View key={i} style={styles.noteItem}>
              <Text style={styles.noteAuthor}>{n.author} ({n.date})</Text>
              <Text style={styles.noteText}>{n.text}</Text>
            </View>
          ))}
        </View>
      )}
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
  searchBox: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.neutral300,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: Colors.neutral900
  },
  btnSearch: {
    backgroundColor: Colors.violet500,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8
  },
  btnSearchText: {
    color: '#fff',
    fontWeight: '700'
  },
  notFoundCard: {
    backgroundColor: Colors.dangerBg,
    borderColor: Colors.danger,
    borderWidth: 1,
    padding: 14,
    borderRadius: 8
  },
  notFoundText: {
    color: Colors.danger,
    fontSize: 13,
    fontWeight: '600'
  },
  resultCard: {
    backgroundColor: Colors.violet50,
    borderColor: Colors.violet200,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  codeText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.violet950
  },
  statusBadge: {
    backgroundColor: Colors.pink100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: Colors.pink800,
    fontWeight: '700',
    fontSize: 12
  },
  metaText: {
    fontSize: 13,
    color: Colors.neutral700,
    marginBottom: 4
  },
  divider: {
    height: 1,
    backgroundColor: Colors.violet200,
    marginVertical: 12
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.violet900,
    marginBottom: 8
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.neutral200
  },
  noteAuthor: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.violet700
  },
  noteText: {
    fontSize: 12,
    color: Colors.neutral800,
    marginTop: 2
  }
});
