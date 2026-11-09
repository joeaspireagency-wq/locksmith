/**
 * Every lucide-react icon used on the site is imported here and nowhere else.
 * If a future lucide release renames an icon, this is the only file to touch.
 */
import { ArrowLeft, ArrowRight, BadgeCheck, Building as Building2, Check, ChevronDown, ChevronsLeftRight, Circle as CircleAlert, CircleCheck, ClipboardList, Clock, DoorClosed, DoorOpen, Hammer, Handshake, House, KeyRound, LoaderCircle, Lock, Mail, MapPin, Menu, MessageCircle, Phone, PhoneCall, PoundSterling, ShieldCheck, Star, UserCheck, Wrench, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IconKey } from '../../data/placeholderContent';

export {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronsLeftRight,
  CircleAlert,
  CircleCheck,
  Clock,
  KeyRound,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Star,
  X,
};
export type { LucideIcon };

/** Maps the icon keys used in placeholderContent.ts to real icons. */
export const ICONS: Record<IconKey, LucideIcon> = {
  door: DoorClosed,
  key: KeyRound,
  shield: ShieldCheck,
  wrench: Wrench,
  hammer: Hammer,
  building: Building2,
  pound: PoundSterling,
  id: UserCheck,
  badge: BadgeCheck,
  handshake: Handshake,
  clipboard: ClipboardList,
  phone: PhoneCall,
  tools: Wrench,
  home: House,
  lock: Lock,
};

export { DoorOpen };
