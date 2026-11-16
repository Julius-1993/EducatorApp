// Shared Lucide icon wrapper: consistent size and stroke everywhere.
export function Ic({ icon: Icon, size = 16, color, style, className }) {
  if (!Icon) return null;
  return <Icon size={size} color={color} style={style} className={className} strokeWidth={2} />;
}
