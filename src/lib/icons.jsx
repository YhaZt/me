import {
  Code2, Coffee, Briefcase, Rocket, Github, Linkedin, Mail, Globe,
  Twitter, Facebook, Instagram, MessageCircle, ExternalLink, Calendar,
  BarChart3, Clock, FileDown, Heart, Star, Zap, Target, Award, Users,
  TrendingUp, Monitor, Smartphone, Database, Server, Shield, Terminal,
  Layers, Gamepad2, Music, Camera, Pen, BookOpen,
} from 'lucide-react';

const icons = {
  Code2, Coffee, Briefcase, Rocket, Github, Linkedin, Mail, Globe,
  Twitter, Facebook, Instagram, MessageCircle, ExternalLink, Calendar,
  BarChart3, Clock, FileDown, Heart, Star, Zap, Target, Award, Users,
  TrendingUp, Monitor, Smartphone, Database, Server, Shield, Terminal,
  Layers, Gamepad2, Music, Camera, Pen, BookOpen,
};

export function getIcon(name, props = {}) {
  const Icon = icons[name];
  if (!Icon) return <Globe {...props} />;
  return <Icon {...props} />;
}

export const iconNames = Object.keys(icons);
