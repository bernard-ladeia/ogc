'use client';

import { use } from 'react';
import Link from 'next/link';
import registry from '@/canvases/registry';

export default function CanvasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const Canvas = registry[slug];

  return (
    <div style={{ minHeight: '100vh', background: '#181818' }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderBottom: '1px solid #E4E4E433',
        background: '#141414',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          color: '#E4E4E48D',
          textDecoration: 'none',
          padding: '3px 8px',
          borderRadius: 4,
          border: '1px solid #E4E4E433',
        }}>
          ← Dashboards
        </Link>
        <span style={{ fontSize: 12, color: '#E4E4E45E' }}>/</span>
        <span style={{ fontSize: 12, color: '#E4E4E4EB' }}>{slug}</span>
      </nav>

      <div style={{ padding: 16 }}>
        {Canvas ? (
          <Canvas />
        ) : (
          <div style={{ padding: 48, textAlign: 'center', color: '#E4E4E48D' }}>
            <p style={{ fontSize: 14, margin: 0 }}>Canvas <code style={{ fontSize: 13, background: '#E4E4E41E', padding: '1px 6px', borderRadius: 3 }}>{slug}</code> não encontrado.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: '#87c3ff' }}>
              Voltar ao início
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
