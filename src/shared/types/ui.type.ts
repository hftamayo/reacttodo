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

export type ViewSettingsFormProps = {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  initialValues: any;
};
