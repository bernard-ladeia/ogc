'use client';

import React, {
  CSSProperties,
  ReactNode,
  JSX,
  useState,
  useCallback,
} from 'react';
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  PieChart as RPieChart,
  Pie,
  Cell,
} from 'recharts';

// ─── Theme ──────────────────────────────────────────────────────────────────

const DARK_PALETTE = {
  foreground: '#E4E4E4EB',
  foregroundSecondary: '#E4E4E48D',
  foregroundTertiary: '#E4E4E45E',
  foregroundQuaternary: '#E4E4E442',
  editor: '#181818',
  chrome: '#141414',
  elevated: '#181818',
  fillPrimary: '#E4E4E430',
  fillSecondary: '#E4E4E41E',
  fillTertiary: '#E4E4E411',
  fillQuaternary: '#E4E4E40A',
  strokePrimary: '#E4E4E433',
  strokeSecondary: '#E4E4E41F',
  strokeTertiary: '#E4E4E414',
  accent: '#599CE7',
  buttonBackground: '#599CE7',
  buttonForeground: '#191c22',
  link: '#87c3ff',
};

const DARK_THEME = {
  kind: 'dark',
  bg: {
    editor: DARK_PALETTE.editor,
    chrome: DARK_PALETTE.chrome,
    elevated: DARK_PALETTE.elevated,
  },
  text: {
    primary: DARK_PALETTE.foreground,
    secondary: DARK_PALETTE.foregroundSecondary,
    tertiary: DARK_PALETTE.foregroundTertiary,
    quaternary: DARK_PALETTE.foregroundQuaternary,
    link: DARK_PALETTE.link,
    onAccent: DARK_PALETTE.buttonForeground,
  },
  fill: {
    primary: DARK_PALETTE.fillPrimary,
    secondary: DARK_PALETTE.fillSecondary,
    tertiary: DARK_PALETTE.fillTertiary,
    quaternary: DARK_PALETTE.fillQuaternary,
  },
  stroke: {
    primary: DARK_PALETTE.strokePrimary,
    secondary: DARK_PALETTE.strokeSecondary,
    tertiary: DARK_PALETTE.strokeTertiary,
    focused: DARK_PALETTE.accent,
  },
  accent: {
    primary: DARK_PALETTE.accent,
    control: DARK_PALETTE.buttonBackground,
    controlHover: '#6AABE9',
  },
  diff: {
    added: '#3FA26633',
    removed: '#B8004933',
  },
  palette: {
    gray: '#E4E4E48A',
    purple: '#9386F2',
    green: '#3FA266',
    yellow: '#F1B467',
    cyan: '#81A1C1',
    pink: '#B48EAD',
    blue: '#7BAFE9',
    orange: '#D08770',
  },
  category: {
    gray: '#E4E4E48A',
    purple: '#9386F2',
    green: '#3FA266',
    yellow: '#F1B467',
    cyan: '#81A1C1',
    pink: '#B48EAD',
    blue: '#7BAFE9',
    orange: '#D08770',
  },
  tokens: {} as Record<string, unknown>,
};

// ─── Exports for token/palette consumers ────────────────────────────────────

export const colorPalette = DARK_THEME.palette;
export const categoryPaletteDark = DARK_THEME.palette;
export const categoryPaletteLight = {
  gray: '#1414148A',
  purple: '#7754D9',
  green: '#1F8A65',
  yellow: '#C08532',
  cyan: '#4C7F8C',
  pink: '#B8448B',
  blue: '#3685BF',
  orange: '#DB704B',
};
export const usageColorSequence = ['blue', 'green', 'purple', 'yellow', 'cyan', 'pink', 'orange', 'gray'] as const;
export const canvasTokens = DARK_THEME;
export const canvasTokensLight = DARK_THEME;
export const canvasPaletteDark = DARK_PALETTE;
export const canvasPaletteLight = {};
export type Color = 'gray' | 'purple' | 'green' | 'yellow' | 'cyan' | 'pink' | 'blue' | 'orange';
export type CategoryPalette = Readonly<Record<Color, string>>;

// ─── Chart colors ────────────────────────────────────────────────────────────

const CHART_COLORS = [
  '#1F8A65E8', '#70B0D8E0', '#5A6CC0F0', '#F0A040E0',
  '#C06028E0', '#E8C030E0', '#C85898E0', '#F0A088E0',
  '#7B64B8F0', '#7DCAB0E0', '#8888A8E0', '#2A9A8AE0',
];

const TONE_COLORS: Record<string, string> = {
  success: '#3FA266',
  danger: '#E05C6E',
  warning: '#F1B467',
  info: '#599CE7',
  neutral: '#8888A8E0',
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useHostTheme() {
  return DARK_THEME;
}

export function useCanvasState<T>(key: string, defaultValue: T): [T, (action: T | ((prev: T) => T)) => void] {
  return useState<T>(defaultValue);
}

export function useCanvasAction() {
  return useCallback((action: { type: string; path?: string; agentId?: string; userPrompt?: string }) => {
    if (action.type === 'openFile' && action.path) {
      const filename = action.path.split('/').pop()?.split('\\').pop() ?? '';
      const slug = filename.replace(/\.canvas\.tsx$/, '').replace(/\.tsx$/, '');
      if (slug) window.location.href = `/canvas/${slug}`;
    }
  }, []);
}

// ─── Utils ───────────────────────────────────────────────────────────────────

export function mergeStyle(base: CSSProperties, override?: CSSProperties): CSSProperties {
  return { ...base, ...override };
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export type StackProps = { children?: ReactNode; gap?: number; style?: CSSProperties };
export function Stack({ children, gap = 0, style }: StackProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {children}
    </div>
  );
}

export type RowProps = {
  children?: ReactNode;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  wrap?: boolean;
  style?: CSSProperties;
};
export function Row({ children, gap = 0, align = 'start', justify = 'start', wrap, style }: RowProps): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }}>
      {children}
    </div>
  );
}

export type GridProps = {
  children?: ReactNode;
  columns: number | string;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  style?: CSSProperties;
};
export function Grid({ children, columns, gap = 0, align, style }: GridProps): JSX.Element {
  const templateColumns = typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: templateColumns,
      gap,
      alignItems: align,
      ...style,
    }}>
      {children}
    </div>
  );
}

export type DividerProps = { style?: CSSProperties };
export function Divider({ style }: DividerProps): JSX.Element {
  return <hr style={{ border: 'none', borderTop: `1px solid ${DARK_PALETTE.strokePrimary}`, margin: 0, ...style }} />;
}

export function Spacer(): JSX.Element {
  return <div style={{ flex: 1 }} />;
}

// ─── Typography ───────────────────────────────────────────────────────────────

export type TextProps = {
  children?: ReactNode;
  tone?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  size?: 'body' | 'small';
  as?: 'p' | 'span';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  italic?: boolean;
  truncate?: boolean | 'start' | 'end';
  style?: CSSProperties;
};
export function Text({ children, tone = 'primary', size = 'body', as: Tag = 'p', weight = 'normal', italic, truncate, style }: TextProps): JSX.Element {
  const colorMap = {
    primary: DARK_PALETTE.foreground,
    secondary: DARK_PALETTE.foregroundSecondary,
    tertiary: DARK_PALETTE.foregroundTertiary,
    quaternary: DARK_PALETTE.foregroundQuaternary,
  };
  const weightMap = { normal: 400, medium: 500, semibold: 600, bold: 700 };
  const truncateStyle: CSSProperties = truncate
    ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
    : {};
  return (
    <Tag style={{
      color: colorMap[tone],
      fontSize: size === 'small' ? 12 : 14,
      fontWeight: weightMap[weight],
      fontStyle: italic ? 'italic' : 'normal',
      margin: 0,
      lineHeight: 1.5,
      ...truncateStyle,
      ...style,
    }}>
      {children}
    </Tag>
  );
}

export type H1Props = { children?: ReactNode; style?: CSSProperties };
export function H1({ children, style }: H1Props): JSX.Element {
  return <h1 style={{ fontSize: 24, fontWeight: 600, color: DARK_PALETTE.foreground, margin: 0, lineHeight: 1.3, ...style }}>{children}</h1>;
}

export type H2Props = { children?: ReactNode; style?: CSSProperties };
export function H2({ children, style }: H2Props): JSX.Element {
  return <h2 style={{ fontSize: 18, fontWeight: 600, color: DARK_PALETTE.foreground, margin: 0, lineHeight: 1.3, ...style }}>{children}</h2>;
}

export type H3Props = { children?: ReactNode; style?: CSSProperties };
export function H3({ children, style }: H3Props): JSX.Element {
  return <h3 style={{ fontSize: 15, fontWeight: 600, color: DARK_PALETTE.foreground, margin: 0, lineHeight: 1.3, ...style }}>{children}</h3>;
}

export type CodeProps = { children?: ReactNode; style?: CSSProperties };
export function Code({ children, style }: CodeProps): JSX.Element {
  return (
    <code style={{
      fontFamily: 'monospace',
      fontSize: '0.92em',
      background: DARK_PALETTE.fillSecondary,
      borderRadius: 3,
      padding: '1px 4px',
      color: DARK_PALETTE.foreground,
      ...style,
    }}>
      {children}
    </code>
  );
}

export type LinkProps = { children?: ReactNode; href: string; style?: CSSProperties };
export function Link({ children, href, style }: LinkProps): JSX.Element {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: DARK_PALETTE.link, textDecoration: 'none', ...style }}>
      {children}
    </a>
  );
}

// ─── Surfaces ─────────────────────────────────────────────────────────────────

export type CardProps = {
  children?: ReactNode;
  variant?: 'default' | 'borderless';
  size?: 'base' | 'lg';
  stickyHeader?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
};
export function Card({ children, variant = 'default', collapsible, defaultOpen = true, open: openProp, onOpenChange, style }: CardProps): JSX.Element {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : internalOpen;

  const toggle = () => {
    if (!collapsible) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div style={{
      border: variant === 'borderless' ? 'none' : `1px solid ${DARK_PALETTE.strokePrimary}`,
      borderRadius: 6,
      overflow: 'hidden',
      ...style,
    }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === CardHeader && collapsible) {
          return React.cloneElement(child as React.ReactElement<CardHeaderProps>, {
            onClick: toggle,
            _collapsible: true,
            _open: isOpen,
          });
        }
        if (child.type === CardBody && collapsible && !isOpen) return null;
        return child;
      })}
    </div>
  );
}

export type CardHeaderProps = {
  children?: ReactNode;
  trailing?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  _collapsible?: boolean;
  _open?: boolean;
};
export function CardHeader({ children, trailing, style, onClick, _collapsible, _open }: CardHeaderProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 500,
        color: DARK_PALETTE.foregroundSecondary,
        borderBottom: `1px solid ${DARK_PALETTE.strokePrimary}`,
        cursor: _collapsible ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {_collapsible && (
          <svg width={10} height={10} viewBox="0 0 10 10" style={{ transform: _open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
            <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" />
          </svg>
        )}
        {children}
      </span>
      {trailing && <span>{trailing}</span>}
    </div>
  );
}

export type CardBodyProps = { children?: ReactNode; style?: CSSProperties };
export function CardBody({ children, style }: CardBodyProps): JSX.Element | null {
  return (
    <div style={{ padding: 12, ...style }}>
      {children}
    </div>
  );
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type ButtonProps = {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  onClick?: () => void;
};
export function Button({ children, variant = 'secondary', disabled, type = 'button', style, onClick }: ButtonProps): JSX.Element {
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: DARK_PALETTE.buttonBackground,
      color: DARK_PALETTE.buttonForeground,
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: DARK_PALETTE.foreground,
      border: `1px solid ${DARK_PALETTE.strokePrimary}`,
    },
    ghost: {
      background: 'transparent',
      color: DARK_PALETTE.foreground,
      border: 'none',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        height: 24,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.15s',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export type PillProps = {
  children?: ReactNode;
  active?: boolean;
  tone?: string;
  size?: 'sm' | 'md';
  leadingContent?: ReactNode;
  keyboardHint?: string;
  disabled?: boolean;
  title?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
export function Pill({ children, active, size = 'md', leadingContent, disabled, title, style, onClick }: PillProps): JSX.Element {
  const isSmall = size === 'sm';
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: isSmall ? '1px 6px' : '3px 10px',
        height: isSmall ? 18 : 24,
        borderRadius: 12,
        fontSize: isSmall ? 11 : 12,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        background: active ? DARK_PALETTE.fillPrimary : 'transparent',
        color: active ? DARK_PALETTE.foreground : DARK_PALETTE.foregroundSecondary,
        border: `1px solid ${active ? DARK_PALETTE.strokePrimary : 'transparent'}`,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {leadingContent}
      {children}
    </button>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
};
export function Select({ value, onChange, options, placeholder, disabled, style }: SelectProps): JSX.Element {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        background: DARK_PALETTE.chrome,
        color: DARK_PALETTE.foreground,
        border: `1px solid ${DARK_PALETTE.strokePrimary}`,
        borderRadius: 4,
        padding: '3px 8px',
        fontSize: 12,
        height: 28,
        cursor: 'pointer',
        ...style,
      }}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export type TextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  style?: CSSProperties;
};
export function TextInput({ value, onChange, placeholder, disabled, type = 'text', style }: TextInputProps): JSX.Element {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        background: DARK_PALETTE.chrome,
        color: DARK_PALETTE.foreground,
        border: `1px solid ${DARK_PALETTE.strokePrimary}`,
        borderRadius: 4,
        padding: '3px 8px',
        fontSize: 12,
        height: 28,
        ...style,
      }}
    />
  );
}

export type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
};
export function Checkbox({ checked, onChange, disabled, label, style }: CheckboxProps): JSX.Element {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ accentColor: DARK_PALETTE.accent }}
      />
      {label && <span style={{ fontSize: 12, color: DARK_PALETTE.foreground }}>{label}</span>}
    </label>
  );
}

export type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: CSSProperties;
};
export function Toggle({ checked, onChange, disabled, style }: ToggleProps): JSX.Element {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ accentColor: DARK_PALETTE.accent }}
      />
    </label>
  );
}

export type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  variant?: 'default' | 'circle';
  size?: 'sm' | 'md';
  style?: CSSProperties;
};
export function IconButton({ children, onClick, disabled, title, variant = 'default', size = 'md', style }: IconButtonProps): JSX.Element {
  const sz = size === 'sm' ? 16 : 20;
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sz,
        height: sz,
        borderRadius: variant === 'circle' ? '50%' : 3,
        border: 'none',
        background: variant === 'circle' ? DARK_PALETTE.fillSecondary : 'transparent',
        color: DARK_PALETTE.foregroundSecondary,
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

export type StatTone = 'success' | 'danger' | 'warning' | 'info';
export type StatProps = {
  value: ReactNode;
  label: string;
  tone?: StatTone;
  style?: CSSProperties;
};
export function Stat({ value, label, tone, style }: StatProps): JSX.Element {
  const color = tone ? TONE_COLORS[tone] : DARK_PALETTE.foreground;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      <span style={{ fontSize: 28, fontWeight: 600, color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
      <span style={{ fontSize: 12, color: DARK_PALETTE.foregroundSecondary }}>
        {label}
      </span>
    </div>
  );
}

export type CalloutTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type CalloutProps = {
  children?: ReactNode;
  tone?: CalloutTone;
  title?: ReactNode;
  icon?: ReactNode;
  style?: CSSProperties;
};
export function Callout({ children, tone = 'info', title, style }: CalloutProps): JSX.Element {
  const borderColor = TONE_COLORS[tone] ?? TONE_COLORS.info;
  return (
    <div style={{
      borderLeft: `3px solid ${borderColor}`,
      background: DARK_PALETTE.fillSecondary,
      borderRadius: '0 4px 4px 0',
      padding: '8px 12px',
      ...style,
    }}>
      {title && <div style={{ fontWeight: 600, fontSize: 13, color: DARK_PALETTE.foreground, marginBottom: 4 }}>{title}</div>}
      <div style={{ fontSize: 13, color: DARK_PALETTE.foregroundSecondary }}>{children}</div>
    </div>
  );
}

// ─── Table ───────────────────────────────────────────────────────────────────

export type TableColumnAlign = 'left' | 'center' | 'right';
export type TableRowTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type TableProps = {
  headers: ReactNode[];
  rows: ReactNode[][];
  columnAlign?: Array<TableColumnAlign | undefined>;
  rowTone?: Array<TableRowTone | undefined>;
  framed?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  style?: CSSProperties;
  emptyMessage?: ReactNode;
};
export function Table({ headers, rows, columnAlign, rowTone, framed = true, striped, style, emptyMessage }: TableProps): JSX.Element {
  return (
    <div style={{
      border: framed ? `1px solid ${DARK_PALETTE.strokePrimary}` : 'none',
      borderRadius: framed ? 6 : 0,
      overflowX: 'auto',
      ...style,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${DARK_PALETTE.strokePrimary}` }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '6px 12px',
                textAlign: columnAlign?.[i] ?? 'left',
                color: DARK_PALETTE.foregroundSecondary,
                fontWeight: 500,
                fontSize: 12,
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && emptyMessage ? (
            <tr>
              <td colSpan={headers.length} style={{ padding: '12px', textAlign: 'center', color: DARK_PALETTE.foregroundTertiary }}>
                {emptyMessage}
              </td>
            </tr>
          ) : rows.map((row, ri) => {
            const tone = rowTone?.[ri];
            const dotColor = tone ? TONE_COLORS[tone] : null;
            return (
              <tr
                key={ri}
                style={{
                  background: striped && ri % 2 === 1 ? DARK_PALETTE.fillTertiary : 'transparent',
                  borderBottom: `1px solid ${DARK_PALETTE.strokeTertiary}`,
                }}
              >
                {headers.map((_, ci) => (
                  <td key={ci} style={{
                    padding: '6px 12px',
                    textAlign: columnAlign?.[ci] ?? 'left',
                    color: DARK_PALETTE.foreground,
                    verticalAlign: 'middle',
                  }}>
                    {ci === 0 && dotColor ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                        {row[ci]}
                      </span>
                    ) : row[ci]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Swatch ───────────────────────────────────────────────────────────────────

export type SwatchProps = { color: Color; style?: CSSProperties };
export function Swatch({ color, style }: SwatchProps): JSX.Element {
  const colorValue = DARK_THEME.palette[color] ?? DARK_PALETTE.foregroundSecondary;
  return (
    <span style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 2,
      background: colorValue,
      flexShrink: 0,
      ...style,
    }} />
  );
}

// ─── CollapsibleSection ──────────────────────────────────────────────────────

export type CollapsibleSectionProps = {
  title: ReactNode;
  children?: ReactNode;
  count?: number;
  leading?: ReactNode;
  defaultOpen?: boolean;
  style?: CSSProperties;
};
export function CollapsibleSection({ title, children, count, leading, defaultOpen = true, style }: CollapsibleSectionProps): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={style}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${DARK_PALETTE.strokeTertiary}`,
          padding: '6px 0',
          cursor: 'pointer',
          color: DARK_PALETTE.foregroundSecondary,
          fontSize: 12,
          fontWeight: 500,
          textAlign: 'left',
        }}
      >
        <svg width={10} height={10} viewBox="0 0 10 10" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
          <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </svg>
        {leading}
        <span>{title}</span>
        {count !== undefined && <span style={{ color: DARK_PALETTE.foregroundTertiary, marginLeft: 4 }}>{count}</span>}
      </button>
      {open && <div style={{ paddingTop: 8 }}>{children}</div>}
    </div>
  );
}

// ─── UsageBar ─────────────────────────────────────────────────────────────────

export type UsageBarSegment = { value: number; color?: Color; label?: string };
export type UsageBarProps = {
  segments: UsageBarSegment[];
  total?: number;
  style?: CSSProperties;
};
export function UsageBar({ segments, total, style }: UsageBarProps): JSX.Element {
  const sum = total ?? segments.reduce((acc, s) => acc + s.value, 0);
  return (
    <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: DARK_PALETTE.fillSecondary, ...style }}>
      {segments.map((seg, i) => {
        const colorKey = (seg.color ?? usageColorSequence[i % usageColorSequence.length]) as Color;
        const colorValue = DARK_THEME.palette[colorKey] ?? DARK_PALETTE.accent;
        const width = sum > 0 ? `${(seg.value / sum) * 100}%` : '0%';
        return <div key={i} style={{ width, background: colorValue }} />;
      })}
    </div>
  );
}

// ─── Charts ───────────────────────────────────────────────────────────────────

export type ChartTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type ChartDataPoint = { label: string; value: number };
export type ChartSeries = { name: string; data: number[]; tone?: ChartTone };
export type ChartReferenceLine = { value: number; label?: string; tone?: ChartTone };

const chartTooltipStyle: CSSProperties = {
  background: DARK_PALETTE.elevated,
  border: `1px solid ${DARK_PALETTE.strokePrimary}`,
  borderRadius: 4,
  fontSize: 12,
  color: DARK_PALETTE.foreground,
};

function getSeriesColor(series: ChartSeries, index: number): string {
  if (series.tone) return TONE_COLORS[series.tone] ?? CHART_COLORS[index % CHART_COLORS.length];
  return CHART_COLORS[index % CHART_COLORS.length];
}

export type BarChartProps = {
  categories: string[];
  series: ChartSeries[];
  height?: number;
  stacked?: boolean;
  horizontal?: boolean;
  normalized?: boolean;
  valueSuffix?: string;
  valuePrefix?: string;
  showValues?: boolean;
  beginAtZero?: boolean;
  yMin?: number;
  yMax?: number;
  referenceLines?: ChartReferenceLine[];
  style?: CSSProperties;
};

export function BarChart({
  categories,
  series,
  height = 300,
  stacked,
  horizontal,
  normalized,
  valueSuffix = '',
  valuePrefix = '',
  showValues,
  beginAtZero = true,
  yMin,
  yMax,
  referenceLines,
  style,
}: BarChartProps): JSX.Element {
  const data = categories.map((cat, i) => ({
    name: cat,
    ...series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] ?? 0 }), {} as Record<string, number>),
  }));

  const isStacked = stacked || normalized;
  const stackId = isStacked ? 'stack' : undefined;

  const domain: [number | string, number | string] = [
    yMin !== undefined ? yMin : beginAtZero ? 0 : 'auto',
    yMax !== undefined ? yMax : normalized ? 100 : 'auto',
  ];

  const labelFormatter = (v: number) =>
    normalized ? `${v.toFixed(0)}%` : `${valuePrefix}${v}${valueSuffix}`;

  return (
    <div style={{ width: '100%', height, ...style }}>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 10, right: 16, bottom: 16, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={DARK_PALETTE.strokeTertiary} vertical={!horizontal} horizontal={horizontal} />
          {horizontal ? (
            <>
              <YAxis dataKey="name" type="category" tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 12 }} width={120} />
              <XAxis type="number" domain={domain} tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 12 }} tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 11 }} />
              <YAxis domain={domain} tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 12 }} tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`} />
            </>
          )}
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(v: number) => [labelFormatter(v)]}
          />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: DARK_PALETTE.foregroundSecondary }} />}
          {referenceLines?.map((rl, i) => (
            <ReferenceLine
              key={i}
              y={horizontal ? undefined : rl.value}
              x={horizontal ? rl.value : undefined}
              stroke={rl.tone ? TONE_COLORS[rl.tone] : DARK_PALETTE.foregroundTertiary}
              strokeDasharray="4 4"
              label={{ value: rl.label, fill: DARK_PALETTE.foregroundSecondary, fontSize: 11 }}
            />
          ))}
          {series.map((s, i) => (
            <Bar
              key={s.name}
              dataKey={s.name}
              fill={getSeriesColor(s, i)}
              stackId={stackId}
              radius={isStacked ? undefined : [2, 2, 0, 0]}
              label={showValues ? { position: 'top', fill: DARK_PALETTE.foregroundSecondary, fontSize: 11, formatter: labelFormatter } : false}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export type PieChartProps = {
  data: Array<ChartDataPoint & { tone?: ChartTone }>;
  size?: number;
  donut?: boolean;
  style?: CSSProperties;
};
export function PieChart({ data, size = 200, donut, style }: PieChartProps): JSX.Element {
  return (
    <div style={{ width: size, height: size, ...style }}>
      <RPieChart width={size} height={size}>
        <Pie
          data={data.map((d) => ({ name: d.label, value: d.value }))}
          cx="50%"
          cy="50%"
          innerRadius={donut ? size * 0.3 : 0}
          outerRadius={size * 0.42}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.tone ? TONE_COLORS[entry.tone] : CHART_COLORS[i % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11, color: DARK_PALETTE.foregroundSecondary }} />
      </RPieChart>
    </div>
  );
}

export type LineChartProps = {
  categories: string[];
  series: ChartSeries[];
  height?: number;
  fill?: boolean;
  valueSuffix?: string;
  valuePrefix?: string;
  showValues?: boolean;
  showHoverGuide?: boolean;
  beginAtZero?: boolean;
  yMin?: number;
  yMax?: number;
  referenceLines?: ChartReferenceLine[];
  style?: CSSProperties;
};

import { LineChart as RLineChart, Line, Area, AreaChart } from 'recharts';

export function LineChart({
  categories,
  series,
  height = 300,
  fill,
  valueSuffix = '',
  valuePrefix = '',
  beginAtZero = true,
  yMin,
  yMax,
  referenceLines,
  style,
}: LineChartProps): JSX.Element {
  const data = categories.map((cat, i) => ({
    name: cat,
    ...series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] ?? 0 }), {} as Record<string, number>),
  }));

  const domain: [number | string, number | string] = [
    yMin !== undefined ? yMin : beginAtZero ? 0 : 'auto',
    yMax !== undefined ? yMax : 'auto',
  ];

  const tickFmt = (v: number) => `${valuePrefix}${v}${valueSuffix}`;

  if (fill) {
    return (
      <div style={{ width: '100%', height, ...style }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 16, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={DARK_PALETTE.strokeTertiary} />
            <XAxis dataKey="name" tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 11 }} />
            <YAxis domain={domain} tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 12 }} tickFormatter={tickFmt} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [tickFmt(v)]} />
            {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: DARK_PALETTE.foregroundSecondary }} />}
            {referenceLines?.map((rl, i) => (
              <ReferenceLine key={i} y={rl.value} stroke={rl.tone ? TONE_COLORS[rl.tone] : DARK_PALETTE.foregroundTertiary} strokeDasharray="4 4" />
            ))}
            {series.map((s, i) => {
              const color = getSeriesColor(s, i);
              return <Area key={s.name} type="monotone" dataKey={s.name} stroke={color} fill={color} fillOpacity={0.15} />;
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height, ...style }}>
      <ResponsiveContainer width="100%" height="100%">
        <RLineChart data={data} margin={{ top: 10, right: 16, bottom: 16, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={DARK_PALETTE.strokeTertiary} />
          <XAxis dataKey="name" tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 11 }} />
          <YAxis domain={domain} tick={{ fill: DARK_PALETTE.foregroundSecondary, fontSize: 12 }} tickFormatter={tickFmt} />
          <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [tickFmt(v)]} />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12, color: DARK_PALETTE.foregroundSecondary }} />}
          {referenceLines?.map((rl, i) => (
            <ReferenceLine key={i} y={rl.value} stroke={rl.tone ? TONE_COLORS[rl.tone] : DARK_PALETTE.foregroundTertiary} strokeDasharray="4 4" />
          ))}
          {series.map((s, i) => (
            <Line key={s.name} type="monotone" dataKey={s.name} stroke={getSeriesColor(s, i)} dot={{ r: 3 }} />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── TodoList (stub) ──────────────────────────────────────────────────────────

export type TodoStatus = 'todo' | 'in_progress' | 'done';
export type TodoItem = { id: string; text: string; status: TodoStatus };
export type TodoListProps = { items: TodoItem[]; style?: CSSProperties };
export function TodoList({ items, style }: TodoListProps): JSX.Element {
  return (
    <Stack gap={4} style={style}>
      {items.map((item) => (
        <Row key={item.id} gap={6} align="center">
          <span style={{ color: item.status === 'done' ? TONE_COLORS.success : DARK_PALETTE.foregroundTertiary }}>
            {item.status === 'done' ? '✓' : item.status === 'in_progress' ? '→' : '○'}
          </span>
          <Text tone={item.status === 'done' ? 'tertiary' : 'primary'}>{item.text}</Text>
        </Row>
      ))}
    </Stack>
  );
}

export type TodoListCardProps = { title: string; items: TodoItem[]; style?: CSSProperties };
export function TodoListCard({ title, items, style }: TodoListCardProps): JSX.Element {
  return (
    <Card style={style}>
      <CardHeader>{title}</CardHeader>
      <CardBody><TodoList items={items} /></CardBody>
    </Card>
  );
}

// ─── CanvasAction type ────────────────────────────────────────────────────────

export type CanvasAction =
  | { type: 'openAgent'; agentId: string }
  | { type: 'newComposerChat'; userPrompt?: string }
  | { type: 'openFile'; path: string; selection?: unknown };

export type SetCanvasState<T> = (action: T | ((prev: T) => T)) => void;
export interface CanvasHostTheme {
  kind: string;
  bg: { editor: string; chrome: string; elevated: string };
  text: { primary: string; secondary: string; tertiary: string; quaternary: string; link: string; onAccent: string };
  fill: { primary: string; secondary: string; tertiary: string; quaternary: string };
  stroke: { primary: string; secondary: string; tertiary: string; focused: string };
  accent: { primary: string; control: string; controlHover: string };
  palette: Record<string, string>;
  category: Record<string, string>;
  tokens: Record<string, unknown>;
}
