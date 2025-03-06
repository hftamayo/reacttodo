export type Language = 'en' | 'es' | 'de';

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

export type AppSettings = {
  language: Language;
  theme: 'dark' | 'light';
  timezone: string;
  fontSize: number;
};

export type SettingsState = {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
};

export type ViewSettingsFormProps = {
  initialValues: AppSettings;
  onCancel: () => void;
  onSubmit: (values: AppSettings) => void;
};
