export type Language = 'en' | 'es' | 'de';

export type Theme = 'dark' | 'light';

export enum Languages {
  EN = 'en',
  ES = 'es',
  DE = 'de',
}

export type Translation = {
  title?: string;
  text?: string;
  group?: { [key: string]: string };
};

export type LanguageContextType = {
  [key: string]: {
    [key in Language]: Translation;
  };
};

export type SettingsCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export type AppSettings = {
  language: Language;
  theme: Theme;
  timezone: string;
  fontSize: number;
};

export type SettingsFormProps = {
  initialValues?: AppSettings;
  labels: {
    control01: string;
    control02?: string;
  };
  onCancel?: () => void;
  onSubmit?: (values: AppSettings) => void;
};

export type SettingsState = {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
};

export type SettingsFormSpecialControlsProps<T> = {
  value: T;
  onChange: (value: T) => void;
  labels: {
    title: string;
    options?: { [key: string]: string };
  };
};
