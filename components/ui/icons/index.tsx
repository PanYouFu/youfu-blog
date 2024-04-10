import { icons } from 'lucide-react'

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}
const DEFAULT_COLOR = '#5b8c00'
const Icon = ({ name, color = DEFAULT_COLOR, size }: IconProps) => {
  const LucideIcon = (icons as any)[name]

  return <LucideIcon color={color} size={size} />
}

export default Icon
