import { Roles } from '@/types/User'

const roleTranslations: Record<Roles, string> = {
    [Roles.ADMIN]: 'Администратор',
    [Roles.USER]: 'Пользователь',
    [Roles.MODERATOR]: 'Модератор',
    [Roles.SUPERADMIN]: 'Супер Администратор',
};

export const translateRole = (role: string | undefined): string => {
    if (!role) return 'Неизвестно';
    return roleTranslations[role as Roles] || 'Неизвестно';
};
