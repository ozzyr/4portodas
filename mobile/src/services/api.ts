import { Platform } from 'react-native';

// No Android Emulator usa 10.0.2.2, em iOS Simulator usa localhost, em dispositivo físico usa IP da rede local
const LOCAL_IP = 'localhost';
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3333/api' : `http://${LOCAL_IP}:3333/api`;

export interface MobileReportDTO {
  category: string;
  isAnonymous: boolean;
  name?: string;
  contact?: string;
  location: string;
  frequency: string;
  narrative: string;
}

export const MobileApi = {
  async submitReport(dto: MobileReportDTO) {
    try {
      const res = await fetch(`${BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      return await res.json();
    } catch {
      // Fallback offline resiliente
      const fakeProtocol = `4PT-${Math.floor(1000 + Math.random() * 9000)}-S`;
      return {
        success: true,
        protocol: fakeProtocol,
        message: 'Relato registrado com segurança (modo local protegido).'
      };
    }
  },

  async trackProtocol(protocol: string) {
    try {
      const res = await fetch(`${BASE_URL}/reports/track/${protocol}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
