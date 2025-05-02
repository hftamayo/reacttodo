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
  onClose?: () => void;
};

export type AppSettings = {
  language: Language;
  theme: Theme;
  timezone: string;
  fontSize: string;
};

export type SettingsFormProps = {
  onCancel: () => void;
  onSubmit: (values: AppSettings) => void;
  labels: {
    control01: string;
    control02?: string;
  };
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

export type SettingsPresenterProps = {
  title: string;
  description: string;
  formValues: AppSettings;
  labels: {
    language: string;
    theme: string;
    timezone: string;
    fontSize: string;
    backup: string;
    cancel: string;
    save: string;
    themeLight: string;
    themeDark: string;
    timezonePlaceholder: string;
    fontSizePlaceholder: string;
  };
  handlers: UseSettingsFormHandlers;
  onSubmit: (values: AppSettings) => void;
  onCancel: () => void;
};

export type UseSettingsFormHandlers = {
  handleSettingChange: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => void;
  submitHandler: (event: React.FormEvent) => void;
  cancelHandler: () => void;
};
