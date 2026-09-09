import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { MobileApi } from '../services/api';

interface ReportScreenProps {
  onBack: () => void;
}

const STEPS = [
  { num: 1, label: 'Ocorrência' },
  { num: 2, label: 'Contexto' },
  { num: 3, label: 'Relato' },
  { num: 4, label: 'Sigilo' },
  { num: 5, label: 'Revisão' }
];

export const ReportScreen: React.FC<ReportScreenProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState('Importunação Verbal e Constrangimento');
  const [location, setLocation] = useState('Corredor do 2º Andar');
  const [frequency, setFrequency] = useState('Recorrente');
  const [narrative, setNarrative] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedProtocol, setGeneratedProtocol] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep === 3 && !narrative.trim()) {
      Alert.alert('Atenção', 'Por favor, descreva o que aconteceu com suas próprias palavras.');
      return;
    }
    if (currentStep === 4 && !isAnonymous && (!name.trim() || !contact.trim())) {
      Alert.alert('Atenção', 'Informe seu nome/turma e uma forma de contato segura.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await MobileApi.submitReport({
      category,
      location,
      frequency,
      narrative: narrative.trim(),
      isAnonymous,
      name: isAnonymous ? undefined : name,
      contact: isAnonymous ? undefined : contact
    });
    setLoading(false);

    if (res && res.protocol) {
      setGeneratedProtocol(res.protocol);
    }
  };

  if (generatedProtocol) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🌸</Text>
        <Text style={styles.successTitle}>Relato Recebido com Sucesso</Text>
        <Text style={styles.successDesc}>
          Seu relato foi salvo com criptografia e transmitido ao Comitê de Proteção Escolar conforme a Lei 14.811/2024.
        </Text>

        <View style={styles.protocolCard}>
          <Text style={styles.protocolLabel}>SEU PROTOCOLO CONFIDENCIAL</Text>
          <Text style={styles.protocolNumber}>{generatedProtocol}</Text>
          <Text style={styles.protocolHint}>Guarde este código para acompanhar o status sem revelar sua identidade.</Text>
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={onBack}>
          <Text style={styles.btnPrimaryText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handlePrev} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← {currentStep === 1 ? 'Voltar ao Início' : 'Etapa Anterior'}</Text>
      </TouchableOpacity>

      {/* STEPPER PROGRESS HEADER */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepperTrack}>
          <View style={[styles.stepperProgress, { width: `${((currentStep - 1) / 4) * 100}%` }]} />
        </View>
        <View style={styles.stepperDotsRow}>
          {STEPS.map((s) => {
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <View key={s.num} style={styles.stepDotWrapper}>
                <View
                  style={[
                    styles.stepDot,
                    isDone && styles.stepDotDone,
                    isCurrent && styles.stepDotCurrent
                  ]}
                >
                  <Text style={[styles.stepDotText, (isDone || isCurrent) && styles.stepDotTextActive]}>
                    {isDone ? '✓' : s.num}
                  </Text>
                </View>
                <Text style={[styles.stepDotLabel, isCurrent && styles.stepDotLabelActive]}>{s.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* STEP 1: OCORRÊNCIA */}
      {currentStep === 1 && (
        <View style={styles.card}>
          <Text style={styles.stepHeaderTag}>ETAPA 1 DE 5</Text>
          <Text style={styles.title}>O que aconteceu?</Text>
          <Text style={styles.subtitle}>Selecione o tipo de situação vivenciada ou presenciada:</Text>

          <View style={styles.categoryList}>
            {[
              'Importunação Verbal e Constrangimento',
              'Toque Físico Sem Consentimento',
              'Exposição ou Assédio Digital',
              'Perseguição e Intimidação (Bullying)',
              'Outra Situação Insegura'
            ].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryCard, category === cat && styles.categoryCardActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}>
            <Text style={styles.btnPrimaryText}>Avançar para Contexto →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2: CONTEXTO */}
      {currentStep === 2 && (
        <View style={styles.card}>
          <Text style={styles.stepHeaderTag}>ETAPA 2 DE 5</Text>
          <Text style={styles.title}>Local e Frequência</Text>
          <Text style={styles.subtitle}>Onde e com que frequência tem ocorrido?</Text>

          <Text style={styles.label}>Local aproximado:</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Ex: Corredor do 2º andar, sala de aula, pátio..."
          />

          <Text style={styles.label}>Frequência:</Text>
          <View style={styles.pillGroup}>
            {['Primeira vez', 'Poucas vezes (2-3x)', 'Recorrente / Diário', 'Acontecendo Agora'].map((freq) => (
              <TouchableOpacity
                key={freq}
                style={[styles.pill, frequency === freq && styles.pillActive]}
                onPress={() => setFrequency(freq)}
              >
                <Text style={[styles.pillText, frequency === freq && styles.pillTextActive]}>{freq}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}>
            <Text style={styles.btnPrimaryText}>Avançar para o Relato →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 3: RELATO */}
      {currentStep === 3 && (
        <View style={styles.card}>
          <Text style={styles.stepHeaderTag}>ETAPA 3 DE 5</Text>
          <Text style={styles.title}>Descreva com suas palavras</Text>
          <Text style={styles.subtitle}>Conte com calma o que aconteceu. Você está em um espaço seguro.</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            value={narrative}
            onChangeText={setNarrative}
            placeholder="Escreva aqui o que você gostaria de nos relatar..."
            multiline
            numberOfLines={5}
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}>
            <Text style={styles.btnPrimaryText}>Avançar para Sigilo →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 4: SIGILO */}
      {currentStep === 4 && (
        <View style={styles.card}>
          <Text style={styles.stepHeaderTag}>ETAPA 4 DE 5</Text>
          <Text style={styles.title}>Como prefere ser tratada?</Text>
          <Text style={styles.subtitle}>Escolha entre sigilo total ou acolhimento direto da psicóloga escolar.</Text>

          <View style={styles.anonymityRow}>
            <TouchableOpacity
              style={[styles.anonCard, isAnonymous && styles.anonCardActive]}
              onPress={() => setIsAnonymous(true)}
            >
              <Text style={styles.anonTitle}>🔒 100% Anônimo</Text>
              <Text style={styles.anonDesc}>Nenhum dado seu gravado. Acompanhe só pelo código.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.anonCard, !isAnonymous && styles.anonCardActive]}
              onPress={() => setIsAnonymous(false)}
            >
              <Text style={styles.anonTitle}>👤 Identificado</Text>
              <Text style={styles.anonDesc}>Apoio individual da psicóloga da escola.</Text>
            </TouchableOpacity>
          </View>

          {!isAnonymous && (
            <View style={styles.identBox}>
              <Text style={styles.identLabel}>Nome ou Iniciais e Turma:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ex: Mariana S. (1º Ano B)"
              />
              <Text style={[styles.identLabel, { marginTop: 8 }]}>Contato (WhatsApp ou e-mail):</Text>
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                placeholder="Ex: mariana@escola.edu.br"
              />
            </View>
          )}

          <TouchableOpacity style={styles.btnPrimary} onPress={handleNext}>
            <Text style={styles.btnPrimaryText}>Revisar e Confirmar →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 5: REVISÃO & ENVIO */}
      {currentStep === 5 && (
        <View style={styles.card}>
          <Text style={styles.stepHeaderTag}>ETAPA 5 DE 5</Text>
          <Text style={styles.title}>Confira seu Relato</Text>
          <Text style={styles.subtitle}>Ao confirmar, seu protocolo confidencial será gerado:</Text>

          <View style={styles.reviewBox}>
            <Text style={styles.reviewLabel}>TIPO DE OCORRÊNCIA:</Text>
            <Text style={styles.reviewValue}>{category}</Text>

            <Text style={styles.reviewLabel}>LOCAL & FREQUÊNCIA:</Text>
            <Text style={styles.reviewValue}>{location} • {frequency}</Text>

            <Text style={styles.reviewLabel}>RELATO:</Text>
            <Text style={styles.reviewText}>"{narrative}"</Text>

            <Text style={styles.reviewLabel}>PRIVACIDADE:</Text>
            <Text style={styles.reviewValue}>{isAnonymous ? '🔒 Totalmente Anônimo' : `👤 Identificado (${name})`}</Text>
          </View>

          <TouchableOpacity
            style={[styles.btnPrimary, { backgroundColor: Colors.pink600 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>
              {loading ? 'Criptografando...' : '🛡️ Confirmar e Enviar Relato'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  stepperContainer: {
    marginBottom: 20
  },
  stepperTrack: {
    height: 3,
    backgroundColor: Colors.neutral300,
    marginHorizontal: 20,
    position: 'relative',
    top: 15
  },
  stepperProgress: {
    height: '100%',
    backgroundColor: Colors.pink500
  },
  stepperDotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stepDotWrapper: {
    alignItems: 'center',
    width: 60
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.neutral300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  stepDotDone: {
    backgroundColor: Colors.pink500,
    borderColor: Colors.pink600
  },
  stepDotCurrent: {
    backgroundColor: Colors.violet700,
    borderColor: Colors.violet200,
    borderWidth: 3
  },
  stepDotText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.neutral600
  },
  stepDotTextActive: {
    color: '#fff'
  },
  stepDotLabel: {
    fontSize: 10,
    color: Colors.neutral600,
    fontWeight: '600'
  },
  stepDotLabelActive: {
    color: Colors.violet900,
    fontWeight: '800'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.neutral200
  },
  stepHeaderTag: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.pink600,
    letterSpacing: 0.5,
    marginBottom: 4
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.neutral900,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 13,
    color: Colors.neutral600,
    marginBottom: 16,
    lineHeight: 18
  },
  categoryList: {
    gap: 8,
    marginBottom: 16
  },
  categoryCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.neutral300,
    backgroundColor: '#fff'
  },
  categoryCardActive: {
    borderColor: Colors.pink500,
    backgroundColor: Colors.pink50
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.neutral800
  },
  categoryTextActive: {
    color: Colors.pink900
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.neutral800,
    marginTop: 10,
    marginBottom: 6
  },
  input: {
    backgroundColor: Colors.neutral50,
    borderWidth: 1,
    borderColor: Colors.neutral300,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: Colors.neutral900
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  pillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral300,
    backgroundColor: '#fff'
  },
  pillActive: {
    backgroundColor: Colors.violet50,
    borderColor: Colors.violet500
  },
  pillText: {
    fontSize: 11,
    color: Colors.neutral700,
    fontWeight: '600'
  },
  pillTextActive: {
    color: Colors.violet900,
    fontWeight: '700'
  },
  anonymityRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  anonCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.neutral300,
    backgroundColor: '#fff'
  },
  anonCardActive: {
    borderColor: Colors.pink500,
    backgroundColor: Colors.pink50
  },
  anonTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.neutral900,
    marginBottom: 2
  },
  anonDesc: {
    fontSize: 10,
    color: Colors.neutral600
  },
  identBox: {
    backgroundColor: Colors.violet50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  identLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.violet900,
    marginBottom: 2
  },
  reviewBox: {
    backgroundColor: Colors.neutral100,
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    gap: 4
  },
  reviewLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.neutral600,
    marginTop: 4
  },
  reviewValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.neutral900
  },
  reviewText: {
    fontSize: 12,
    color: Colors.neutral800,
    fontStyle: 'italic'
  },
  btnPrimary: {
    backgroundColor: Colors.pink500,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700'
  },
  successContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.pageBg
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.success,
    marginBottom: 8,
    textAlign: 'center'
  },
  successDesc: {
    fontSize: 13,
    color: Colors.neutral700,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18
  },
  protocolCard: {
    backgroundColor: Colors.violet50,
    borderColor: Colors.violet500,
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  protocolLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.violet700,
    letterSpacing: 1
  },
  protocolNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.violet950,
    marginVertical: 6
  },
  protocolHint: {
    fontSize: 11,
    color: Colors.violet800,
    textAlign: 'center'
  }
});
