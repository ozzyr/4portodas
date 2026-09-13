import React from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type DialogType = 'alert' | 'confirm' | 'warning' | 'info';

export interface DialogOptions {
  isOpen: boolean;
  type?: DialogType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const AppDialogModal: React.FC<DialogOptions> = ({
  isOpen,
  type = 'info',
  title,
  message,
  confirmText = 'Entendido',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const isConfirm = type === 'confirm';

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={28} color="var(--warning-500)" />;
      case 'alert':
        return <AlertCircle size={28} color="var(--danger-500)" />;
      case 'confirm':
        return <AlertCircle size={28} color="var(--violet-700)" />;
      case 'info':
      default:
        return <Info size={28} color="var(--pink-500)" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'warning':
        return 'var(--warning-50)';
      case 'alert':
        return 'var(--danger-50)';
      case 'confirm':
        return 'var(--violet-50)';
      case 'info':
      default:
        return 'var(--pink-50)';
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel || onConfirm}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 18, 22, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          animation: 'modalSlideUp 0.25s ease-out'
        }}
      >
        <button
          type="button"
          onClick={onCancel || onConfirm}
          aria-label="Fechar modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--neutral-500)',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: getIconBg(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {getIcon()}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--neutral-900)', marginBottom: '0.4rem', fontWeight: 700 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--neutral-700)', lineHeight: 1.5, margin: 0 }}>
              {message}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '1.75rem',
            borderTop: '1px solid var(--neutral-200)',
            paddingTop: '1rem'
          }}
        >
          {isConfirm && (
            <button
              type="button"
              className="btn btn-subtle"
              onClick={onCancel}
              style={{ minHeight: '44px', padding: '0.6rem 1.2rem' }}
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={onConfirm}
            style={{ minHeight: '44px', padding: '0.6rem 1.4rem' }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
